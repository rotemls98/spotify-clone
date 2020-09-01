import React, { useState, useRef } from "react";
import classNames from "classnames";
import styles from "./slider.module.css";

const Slider = ({ position, className, onChange = () => {}, onDrag = () => {}, onEndDrag = () => {}}) => {
  const bar = useRef(null);
  const [dragging, setDragging] = useState(false);

  const setNewPos = (e) => {
    const { x, width } = bar.current.getBoundingClientRect();
    let newPos = ((e.clientX - x) * 100) / width;
    if (newPos > 100) {
      newPos = 100;
    } else if (newPos < 0) {
      newPos = 0;
    }
    onChange(newPos, e);
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    onDrag();
    document.addEventListener("mousemove", setNewPos);
    function remove() {
      setDragging(false);
      onEndDrag();
      document.removeEventListener("mousemove", setNewPos);
      document.removeEventListener("mouseup", remove);
    }
    document.addEventListener("mouseup", remove);
  };

  const handleClick = (e) => {
    const { x, width } = bar.current.getBoundingClientRect();
    const newPos = ((e.clientX - x) * 100) / width;
    onChange(newPos, e);
  };

  const barClassName = classNames(styles.bar, dragging && styles.dragging, className);
  return (
    <div ref={bar} className={barClassName} onClick={handleClick}>
      <span className={styles.innerBar} style={{ width: `${position}%` }} />
      <button
        onMouseDown={handleMouseDown}
        className={styles.button}
        style={{ left: `calc(${position}% - 6px)` }}
      />
    </div>
  );
};

export default Slider;
