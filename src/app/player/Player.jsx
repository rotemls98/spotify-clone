import React from "react";
import AppContent from "./appContent/AppContent";
import AppMenu from "./appMenu/AppMenu";
import Header from "./header/Header";
import PlayBar from "./playerbar/PlayBar";
import Busy from "../../common/components/Busy";
import Sdk from "../providers/Sdk";
import styles from "./player.module.css";

export default function Player() {
  return (
      <div data-testid='main-app' className={styles.container}>
        <Sdk>
        {(isReady) =>
            isReady ? (
            <div className={styles.player}>
                <Header />
                <AppMenu />
                <PlayBar />
                <AppContent />
            </div>
            ) : (
            <Busy className={styles.busy} data-testid="busy-player" />
            )
        }
        </Sdk>
      </div>
  );
}
