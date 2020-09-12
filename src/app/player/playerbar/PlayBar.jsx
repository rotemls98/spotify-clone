import React from 'react';
import CurrentPlayContext from './currentPlayContext/CurrentPlayContext';
import PlayBarInputs from './playBarInputs/PlayBarInputs';
import PlayBarVolume from './playbarVolume/PlayBarVolume';
import { usePlayback } from '../../providers/Sdk';
import styles from './playbar.module.css';

export default function PlayBar() {
    const playback = usePlayback();
    return (
        <div className={styles.playBar}>
            <CurrentPlayContext currentTrack={playback?.track_window?.current_track}/>
            <PlayBarInputs playback={playback}/>
            <PlayBarVolume/>
        </div>
    )
}
