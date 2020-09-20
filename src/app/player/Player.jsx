import React, { useRef } from "react";
import AppContent from "./appContent/AppContent";
import AppMenu from "./appMenu/AppMenu";
import Header from "./header/Header";
import PlayBar from "./playerbar/PlayBar";
import Busy from "../../common/components/Busy";
import Sdk from "../providers/Sdk";
import styles from "./player.module.css";

export default function Player() {
  return (
    <div data-testid="main-app" className={styles.container}>
      <Sdk>
        {(isReady) =>
          isReady ? (
            <PlayerMain />
          ) : (
            <Busy className={styles.busy} data-testid="busy-player" />
          )
        }
      </Sdk>
    </div>
  );
}

const PlayerMain = () => {
  const container = useRef();
  const headerRef = useRef();

  return (
    <div className={styles.player}>
      <Header containerRef={container} headerRef={headerRef} />
      <AppMenu />
      <PlayBar />
      <AppContent containerRef={container} headerRef={headerRef} />
    </div>
  );
};
