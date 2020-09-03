import React, { useState, useEffect, useRef } from "react";
import Slider from "../../../../../common/components/Slider";
import { millisToMinutesAndSeconds } from "../../../../../utils/utils";
import styles from "./trackSlider.module.css";

export default function TrackSlider({ player, duration }) {
  const [time, setTime] = useState(0);
  const [dragging, setDragging] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    if (duration && !dragging) {
      interval.current = setInterval(
        () =>
          player.getCurrentState().then(({ position }) => setTime(position)),
        1000
      );
    }

    return () => clearInterval(interval.current);
  }, [player, duration, dragging]);

  const handleTimeChange = (pos, e) => {
    const time = (pos * duration) / 100;
    setTime(time);

    if (e.type === "click") {
      player.seek(time);
    }
  };

  const handleDragEnd = (pos, e) => {
    const time = (pos * duration) / 100;
    setDragging(false);
    setTime(time);
    player.seek(time);
  }

  const timeFormatted = time ? millisToMinutesAndSeconds(time) : "00:00";
  const durationFormatted = duration
    ? millisToMinutesAndSeconds(duration)
    : "00:00";

  let pos = (time * 100) / duration;
  pos = pos > 100 ? 100 : pos;   
  return (
    <div className={styles.container}>
      <div className={styles.sliderText}>{timeFormatted}</div>
      <Slider
        dragging={dragging}
        position={pos}
        onChange={handleTimeChange}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
        className={styles.slider}
      />
      <div className={styles.sliderText}>{durationFormatted}</div>
    </div>
  );
}
