import React from "react";
import {
  mdiPlayCircleOutline,
  mdiPauseCircleOutline,
  mdiSkipNext,
  mdiSkipPrevious,
} from "@mdi/js";
import { usePlayer } from "../../../providers/Sdk";
import Icon from "../../../../common/components/Icon";
import TrackSlider from "./trackSlider/TrackSlider";
import styles from "./playBarInputs.module.css";

export default function PlayBarInputs({ playback }) {
  const player = usePlayer();
  let duration;
  let paused = true;
  let disallows = {};

  if (playback) {
    disallows = playback.disallows;
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
          title='הבא'
          disabled={disallows.skipping_next}
          className={styles.actionButton}
          onClick={() => player.nextTrack()}
        >
          <Icon
            className={disallows.skipping_next && styles.iconDisabled}
            path={mdiSkipNext}
          />
        </button>
        <button title={paused ? 'נגן' : 'השהייה'} className={styles.actionButton} onClick={handleToggle}>
          {paused ? (
            <Icon path={mdiPlayCircleOutline} />
          ) : (
            <Icon path={mdiPauseCircleOutline} />
          )}
        </button>
        <button
          title='הקודם'
          disabled={disallows.skipping_prev}
          className={styles.actionButton}
          onClick={() => player.previousTrack()}
        >
          <Icon
            className={disallows.skipping_prev && styles.iconDisabled}
            path={mdiSkipPrevious}
          />
        </button>
      </div>
      <TrackSlider player={player} paused={paused} duration={duration} />
    </div>
  );
}
