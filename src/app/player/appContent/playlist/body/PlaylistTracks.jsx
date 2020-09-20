import React from "react";
import Track from "./Track";
import styles from "./playlistTracks.module.css";

export default function PlaylistTracks({ playlist }) {
  const { tracks, uri } = playlist;
  const { items } = tracks;
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Track playlistUri={uri} key={item.track.id} item={item} />
      ))}
    </div>
  );
}
