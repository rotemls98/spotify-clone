import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../../../common/components/Icon";
import styles from './menuShortcuts.module.css';
import { mdiHome, mdiBookshelf  } from '@mdi/js';

export default function MenuShortcuts() {
  return (
    <div className={styles.shortcuts}>
      <NavLink
        exact
        to="/"
        className={styles.option}
        activeClassName={styles.selected}
      >
        <Icon path={mdiHome} />
        מסך הבית
      </NavLink>
      <NavLink
        to="/collection/playlists"
        className={styles.option}
        activeClassName={styles.selected}
      >
        <Icon path={mdiBookshelf} />
        הספרייה שלכם
      </NavLink>
    </div>
  );
}
