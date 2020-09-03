import React, { useRef } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import styles from "./slider.module.css";

const Slider = ({
  position,
  dragging,
  className,
  onChange,
  onDragStart,
  onDragEnd,
}) => {
  const bar = useRef(null);

  const getPos = (e) => {
    const { x, width } = bar.current.getBoundingClientRect();
    let newPos = ((e.clientX - x) * 100) / width;
    if (newPos > 100) {
      newPos = 100;
    } else if (newPos < 0) {
      newPos = 0;
    }
    return newPos;
  }

  const setNewPos = (e) => {
    let newPos = getPos(e);
    onChange(newPos, e);
  };

  const handleMouseDown = (e) => {
    onDragStart(e);
    document.addEventListener("mousemove", setNewPos);
    
    function remove(e) {
      let pos = getPos(e);
      onDragEnd(pos, e);
      document.removeEventListener("mousemove", setNewPos);
      document.removeEventListener("mouseup", remove);
    }
    document.addEventListener("mouseup", remove);
  };

  const handleClick = (e) => {
    let newPos = getPos(e);
    onChange(newPos, e);
  };

  const barClassName = classNames(
    styles.bar,
    dragging && styles.dragging,
    className
  );
  
  return (
    <div ref={bar} className={barClassName} onClick={handleClick}>
      <span
        className={styles.innerBar}
        style={{ transform: `scaleX(${position / 100})` }}
      />
      <button
        onMouseDown={handleMouseDown}
        className={styles.button}
        style={{ left: `calc(${position}% - 6px)` }}
      />
    </div>
  );
};

Slider.propTypes = {
  position: PropTypes.number.isRequired,
  dragging: PropTypes.bool.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default Slider;
