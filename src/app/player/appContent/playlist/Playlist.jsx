import React, { useEffect, Fragment, useState } from "react";
import PlaylistHeader from "./header/PlaylistHeader";
import PlaylistTracks from "./body/PlaylistTracks";
import spotifyApi from "../../../../api";
import Busy from "../../../../common/components/Busy";
import styles from "./playList.module.css";

export default function Playlist({ match }) {
  const [playlist, setPlaylist] = useState();
  const [loading, setLoading] = useState(true);
  const playlistId = match.params.playlistId;

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((playlist) => {
      setPlaylist(playlist);
      setLoading(false);
    });
  }, [playlistId]);

  function renderContent() {
    const { name, owner, images } = playlist;
    return (
      <Fragment>
        <PlaylistHeader name={name} owner={owner} images={images} />
        <PlaylistTracks playlist={playlist} />
      </Fragment>
    );
  }

  return (
    <div className={styles.container}>
      {!loading ? renderContent() : <Busy className={styles.busy} />}
    </div>
  );
}
