import React, { useState, useEffect } from "react";
import spotifyApi from "../../../../api";
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
    <div className={styles.container}>
      <div className={styles.title}>פליילסטים</div>
      <div className={styles.list}>
        {playlists.map(({ id, name }) => (
          <div key={id} className={styles.playlist}>
            <NavLink
              to={`/playlist/${id}`}
              className={styles.playlistLink}
              activeClassName={styles.selected}
            >
              {name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
