import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./currentPlayContext.module.css";

export default function CurrentPlayContext({currentTrack}) {

  const renderInfo = () => {
    const { artists, name } = currentTrack;
    const image = currentTrack.album.images[2].url;
    const albumId = currentTrack.album.uri.split(":")[2];
    const albumType = currentTrack.type === "track" ? "album" : "show";
    return (
      <>
        <img className={styles.image} src={image} alt="album" />
        <div className={styles.info}>
          <Link
            dir="auto"
            to={`/${albumType}/${albumId}`}
            className={styles.name}
          >
            {name}
          </Link>
          <div dir="auto" className={styles.artists}>
            {artists.map(({ name, uri }, i) => {
              const [, type, id] = uri.split(":");
              return (
                <Fragment key={uri}>
                  <Link to={`/${type}/${id}`} className={styles.artist}>
                    {name}
                  </Link>
                  {i >= 0 && i < artists.length - 1 && (
                    <div className={styles.comma}>{", "}</div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      {currentTrack && renderInfo()}
    </div>
  );
}
