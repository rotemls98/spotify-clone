import React from "react";
import PropTypes from "prop-types";
import Menu from "../../../../../common/components/Menu";
import { Link } from "react-router-dom";
import styles from "./userMenu.module.css";

export default function UserMenu({ user, disconnect, ...otherProps }) {
  const options = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  };

  return (
    <Menu className={styles.menu} options={options} {...otherProps}>
      <Link to={`/user/${user.id}`} className={styles.item}>
        פרופיל
      </Link>
      <button onClick={disconnect} className={styles.item}>
        התנתקות
      </button>
    </Menu>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  disconnect: PropTypes.func,
};
