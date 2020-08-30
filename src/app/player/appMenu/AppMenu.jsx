import React from "react";
import SpotifyLogo from "./SpotifyLogo";
import MenuShortcuts from "./shortcuts/MenuShortcuts";
import MenuPlaylists from "./playlists/MenuPlaylists";
import styles from "./appMenu.module.css";

export default function AppMenu() {
  return (
    <nav className={styles.appMenu}>
      <div className={styles.menuLogo}>
        <SpotifyLogo />
      </div>
      <MenuShortcuts/>
      <hr className={styles.divider}/>
      <MenuPlaylists/>
    </nav>
  );
}
