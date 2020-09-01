import React, { useState, useEffect, useRef, useContext } from "react";
import {
  mdiPlayCircleOutline,
  mdiPauseCircleOutline,
  mdiSkipNext,
  mdiSkipPrevious,
} from "@mdi/js";
import Icon from "../../../../common/components/Icon";
import { TrackContext } from "../../../providers/Sdk";
import classNames from "classnames";
import TrackSlider from "./trackSlider/TrackSlider";
import styles from "./playBarInputs.module.css";

export default function PlayBarInputs({ currentTrack }) {
  const track = useContext(TrackContext);
  let progress = 0;
  let duration = 0;
  let paused = true;

  if (track?.playerState) {
    duration = track.playerState.duration;
    progress = track.playerState.position;
    paused = track.playerState.paused;
  }

  const handleToggle = () => {
    if (paused) {
      window.player.resume();
    }
    else {
      window.player.pause();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={() => window.player.nextTrack()}
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
          <Icon
            path={mdiSkipPrevious}
            onClick={() => window.player.previousTrack()}
          />
        </button>
      </div>
      <TrackSlider paused={paused} initialTime={progress} duration={duration} />
    </div>
  );
}
