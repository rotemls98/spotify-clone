import React from "react";
import { Switch, Route } from "react-router-dom";
import styles from "./appContent.module.css";
import Playlist from "./playlist/Playlist";

export default function AppContent({ containerRef, headerRef}) {


  return (
    <div className={styles.content} ref={containerRef}>
      <div ref={headerRef} className={styles.start} data-testid='header-sentienl'></div>
      <div className={styles.innerContent}>
        <Switch>
          <Route
            path="/playlist/:playlistId"
            render={({ match }) => (
              <Playlist
                key={match.params.playlistId}
                match={match}
              />
            )}
          ></Route>
        </Switch>
      </div>
      <div data-testid='sentienl-end'></div>
    </div>
  );
}
