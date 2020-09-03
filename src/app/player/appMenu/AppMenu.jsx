import React from "react";
import SpotifyLogo from "./SpotifyLogo";
import MenuShortcuts from "./shortcuts/MenuShortcuts";
import MenuPlaylists from "./playlists/MenuPlaylists";
import styles from "./appMenu.module.css";
import Icon from "../../../common/components/Icon";
import { mdiDownloadCircle, mdiDownloadCircleOutline } from "@mdi/js";

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
      <a href="https://www.spotify.com/us/download" target="_blank" className={styles.footer}>
        <Icon className={styles.downloadIcon} path={mdiDownloadCircleOutline}></Icon>
        <div> להתקנת האפליקציה</div>
      </a>
    </nav>
  );
}
