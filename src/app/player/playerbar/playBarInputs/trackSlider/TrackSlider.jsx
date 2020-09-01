import React, { useState, useEffect, useRef } from "react";
import Slider from "../../../../../common/components/Slider";
import { millisToMinutesAndSeconds } from "../../../../../utils/utils";
import styles from "./trackSlider.module.css";

export default function TrackSlider({ duration, initialTime = 0, paused }) {
  const [time, setTime] = useState(initialTime);
  const interval = useRef(null);
  const pos = (time * 100) / duration;

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (duration && !paused) {
      interval.current = setInterval(
        () => setTime((prev) => (prev >= duration ? 0 : prev + 1000)),
        1000
      );
    }
    
    return () => {
      clearInterval(interval.current);
    };
  }, [duration, paused]);

  const handleTimeChange = (pos) => {
    const time = (pos * duration) / 100;
    setTime(time);
    window.player.seek(time)
  };

  const handleDrag = () => {
    clearInterval(interval.current);
  };

  const handleDragEnd = () => {
    interval.current = setInterval(
      () => setTime((prev) => (prev >= duration ? 0 : prev + 1000)),
      1000
    );
  };

  const timeFormatted = time ? millisToMinutesAndSeconds(time) : '00:00';
  const durationFormatted = duration ? millisToMinutesAndSeconds(duration) : '00:00';
  return (
    <div className={styles.container}>
      <div className={styles.sliderText}>{timeFormatted}</div>
      <Slider
        onChange={handleTimeChange}
        position={pos}
        className={styles.slider}
        onDrag={handleDrag}
        onEndDrag={handleDragEnd}
      />
      <div className={styles.sliderText}>{durationFormatted}</div>
    </div>
  );
}
