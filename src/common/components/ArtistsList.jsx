import React, {Fragment} from "react";
import { Link} from 'react-router-dom';
import styles from './artistsList.module.css';

export default function ArtistsList({ artists }) {
  return (
    <div dir="auto" className={styles.artists}>
      {artists.map(({ name, uri }, i) => {
        const [, type, id] = uri.split(":");
        return (
          <Fragment key={uri}>
            <Link to={`/${type}/${id}`} className={styles.artist}>
              {name}
            </Link>
            {i >= 0 && i < artists.length - 1 && (
              <div className={styles.comma}>{", "}</div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
