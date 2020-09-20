import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { mdiMusic } from "@mdi/js";
import Icon from "../../../../../common/components/Icon";
import styles from "./playlistHeader.module.css";

export default function PlaylistHeader({ name, images, owner }) {
  const image = images[0]?.url; 
  return (
    <div className={styles.container}>
      {
        image ?
        <img className={styles.image} src={image} alt="playlist"></img> :
        <div className={styles.iconWrapper} data-testid='playlist-logo'>
          <Icon className={styles.icon} path={mdiMusic}/>
        </div>
      }
      <div className={styles.info}>
        <div className={styles.type}>פלייליסט</div>
        <div className={styles.name}>{name}</div>
        <Link className={styles.user} to={`/user/${owner.id}`}>
          {owner.display_name}
        </Link>
      </div>
    </div>
  );
}

PlaylistHeader.propTypes = {
  name: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  images: PropTypes.array,
};
