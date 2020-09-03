import React, { useState, useEffect } from "react";
import Icon from "../../../../common/components/Icon";
import styles from "./playBarVolume.module.css";
import { mdiVolumeSource, mdiVoiceOff, mdiVolumeOff } from "@mdi/js";
import Slider from "../../../../common/components/Slider";
import { usePlayer } from "../../../providers/Sdk";

export default function PlayBarVolume() {
  const [prevVolume, setPrevVolume] = useState(100);
  const [volume, setVolume] = useState(100);
  const [dragging, setDragging] = useState(false);
  const player = usePlayer();

  useEffect(() => {
    player.getVolume().then((volume) => {
      const volumePercentage = volume * 100;
      setVolume(volumePercentage);
    });
  }, [player]);

  const handleChangeSlider = (pos, e) => {
    if (volume) {
      setPrevVolume(volume);
    }
    setVolume(pos);
    if (e.type === "click") {
      player.setVolume(pos / 100);
    }
  };

  const handleClickIcon = () => {
    if (volume > 0) {
      setVolume(0);
      setPrevVolume(volume);
      player.setVolume(0);
    } else {
      setVolume(prevVolume);
      player.setVolume(prevVolume / 100);
    }
  };

  const handleDragEnd = (pos) => {
    setDragging(false);
    setVolume(pos);
    player.setVolume(pos / 100);
  };

  return (
    <div className={styles.container}>
      <Slider
        dragging={dragging}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
        className={styles.slider}
        position={volume}
        onChange={handleChangeSlider}
      />
      <Icon
        onClick={handleClickIcon}
        className={styles.volumeIcon}
        path={volume ? mdiVolumeSource : mdiVolumeOff}
      ></Icon>
    </div>
  );
}
