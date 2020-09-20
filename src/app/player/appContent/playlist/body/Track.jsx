import React, { Fragment } from "react";
import classNames from "classnames";
import {
  mdiMusicNoteOutline,
  mdiPause,
  mdiPlay,
  mdiVolumeSource,
} from "@mdi/js";
import Icon from "../../../../../common/components/Icon";
import ArtistsList from "../../../../../common/components/ArtistsList";
import { Link } from "react-router-dom";
import { usePlayback } from "../../../../providers/Sdk";
import { millisToMinutesAndSeconds } from "../../../../../utils/utils";
import styles from "./track.module.css";
import spotifyApi from "../../../../../api";

function useIsPlaying(track, playlistUri) {
  const playback = usePlayback();
  const currentPlaylistUri = playback?.context?.uri;
  const currentTrack = playback?.track_window?.current_track;
  const currentTrackUri = currentTrack?.linked_from_uri || currentTrack?.uri;
  const paused = playback?.paused;
  const isCurrentTrack =
    currentPlaylistUri === playlistUri && currentTrackUri === track.uri;
  return { paused, isCurrentTrack };
}

export default function Track({ item, playlistUri }) {
  const { track } = item;
  const { album } = track;
  const { paused, isCurrentTrack } = useIsPlaying(track, playlistUri);

  function handleToggleSong() {
    if (!isCurrentTrack) {
      spotifyApi.play({
        context_uri: playlistUri,
        offset: {
          uri: track.uri,
        },
      });
    } else {
      if (!paused) {
        spotifyApi.pause();
      } else {
        spotifyApi.play();
      }
    }
  }

  const time = millisToMinutesAndSeconds(track.duration_ms);
  return (
    <div onDoubleClick={handleToggleSong} className={classNames(styles.track, isCurrentTrack && styles.playing)}>
      {!isCurrentTrack ? (
        <Fragment>
          <Icon className={styles.musicIcon} path={mdiMusicNoteOutline} />
          <Icon
            onClick={handleToggleSong}
            className={styles.playIcon}
            path={mdiPlay}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Icon
            className={styles.musicIcon}
            path={!paused ? mdiVolumeSource : mdiMusicNoteOutline}
          />
          <Icon
            onClick={handleToggleSong}
            className={styles.playIcon}
            path={!paused ? mdiPause : mdiPlay}
          />
        </Fragment>
      )}
      <div className={styles.info}>
        <div className={styles.name}>{track.name}</div>
        <div className={styles.subInfo}>
          <ArtistsList artists={track.artists} />
          <div className={styles.dot}>•</div>
          <Link to={`/album/${album.id}`} className={styles.album}>
            {album.name}
          </Link>
        </div>
      </div>
      <div className={styles.time}>{time}</div>
    </div>
  );
}
