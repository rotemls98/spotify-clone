import React, { Fragment } from "react";
import styles from "./currentSong.module.css";
import { Link } from "react-router-dom";

export default function CurrentSong({ currentTrack }) {
  let item;
  let name;
  let albumId;
  let artists;
  let image;
  if (currentTrack) {
    item = currentTrack.item;
    name = currentTrack.name;
    albumId = currentTrack.album.id;
    artists = currentTrack.artists;
    image = currentTrack.album.images[2].url;
  }
  return (
    <div className={styles.container}>
      {currentTrack && (
        <>
          <img className={styles.image} src={image} alt="album" />
          <div className={styles.info}>
            <Link to={`/album/${albumId}`} className={styles.name}>
              {name}
            </Link>
            <div className={styles.artists}>
              {artists?.map(({ name, id }, i) => (
                <Fragment key={id}>
                  <Link to={`/artist/${id}`} className={styles.artist}>
                    {name}
                  </Link>
                  {i >= 0 && i < artists.length - 1 && (
                    <div className={styles.comma}>{", "}</div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
