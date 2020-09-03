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
    if (playback) {
        trackId = playback.track_window.current_track.id;
    }
    
    useEffect(() => {
        if (trackId) {
            spotifyApi.getTrack(trackId).then(setCurrentTrack);
        }
    }, [trackId]);

    return (
        <div className={styles.playBar}>
            <CurrentSong currentTrack={currentTrackInfo}/>
            <PlayBarInputs/>
            <PlayBarVolume/>
        </div>
    )
}
