import React, { useState, useEffect } from 'react';
import CurrentSong from './currentSong/CurrentSong';
import PlayBarInputs from './playBarInputs/PlayBarInputs';
import PlayBarVolume from './playbarVolume/PlayBarVolume';
import { spotifyApi } from '../../../App';
import { usePlayback } from '../../providers/Sdk';
import styles from './playbar.module.css';

export default function PlayBar() {
    const playback = usePlayback();
    const [currentTrackInfo, setCurrentTrack] = useState();

    let trackId;
    let type;
    if (playback) {
        trackId = playback.track_window.current_track.id;
        type = playback.track_window.current_track.type;
    }
    
    useEffect(() => {
        if (trackId) {
            spotifyApi.getTrack(trackId).then(setCurrentTrack);
        }
    }, [trackId, type]);

    return (
        <div className={styles.playBar}>
            <CurrentSong currentTrack={currentTrackInfo}/>
            <PlayBarInputs/>
            <PlayBarVolume/>
        </div>
    )
}
