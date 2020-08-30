import React, { useState, useEffect } from "react";
import { spotifyApi } from "../../../../App";
import { NavLink } from "react-router-dom";
import styles from "./meunPlaylist.module.css";

export default function MenuPlaylists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    spotifyApi.getUserPlaylists().then((playlists) => {
      setPlaylists(playlists.items);
    });
  }, []);

  return (
    <div className={styles.playlists}>
      <div className={styles.title}>פליילסטים</div>
      <div className={styles.list}>
        {playlists.map(({ id, name }) => (
          <NavLink
            to={`/playlist/${id}`}
            key={id}
            className={styles.playlist}
            activeClassName={styles.selected}
          >
            {name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
