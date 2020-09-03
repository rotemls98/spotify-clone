import React from "react";
import SpotifyLogo from "./SpotifyLogo";
import MenuShortcuts from "./shortcuts/MenuShortcuts";
import MenuPlaylists from "./playlists/MenuPlaylists";
import { mdiDownloadCircleOutline } from "@mdi/js";
import Icon from "../../../common/components/Icon";
import styles from "./appMenu.module.css";

export default function AppMenu() {
  return (
    <nav className={styles.appMenu}>
      <div className={styles.menuLogo}>
        <SpotifyLogo />
      </div>
      <div className={styles.content}>
        <MenuShortcuts />
        <hr className={styles.divider} />
        <MenuPlaylists />
      </div>
      <a href="https://www.spotify.com/us/download" rel="noopener noreferrer" target="_blank" className={styles.footer}>
        <Icon className={styles.downloadIcon} path={mdiDownloadCircleOutline}></Icon>
        <div> להתקנת האפליקציה</div>
      </a>
    </nav>
  );
}
