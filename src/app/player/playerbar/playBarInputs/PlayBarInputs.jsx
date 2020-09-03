import React from "react";
import {
  mdiPlayCircleOutline,
  mdiPauseCircleOutline,
  mdiSkipNext,
  mdiSkipPrevious,
} from "@mdi/js";
import { usePlayback, usePlayer } from "../../../providers/Sdk";
import Icon from "../../../../common/components/Icon";
import TrackSlider from "./trackSlider/TrackSlider";
import styles from "./playBarInputs.module.css";

export default function PlayBarInputs() {
  const player = usePlayer();
  const playback = usePlayback();
  let duration;
  let paused = true;

  if (playback) {
    duration = playback.duration;
    paused = playback.paused;
  }

  const handleToggle = () => {
    if (paused) {
      player.resume();
    } else {
      player.pause();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={() => player.nextTrack()}
        >
          <Icon path={mdiSkipNext} />
        </button>
        <button className={styles.actionButton} onClick={handleToggle}>
          {paused ? (
            <Icon path={mdiPlayCircleOutline} />
          ) : (
            <Icon path={mdiPauseCircleOutline} />
          )}
        </button>
        <button className={styles.actionButton}>
          <Icon path={mdiSkipPrevious} onClick={() => player.previousTrack()} />
        </button>
      </div>
      <TrackSlider player={player} paused={paused} duration={duration} />
    </div>
  );
}
