import React, { useState } from 'react';
import CurrentSong from './currentSong/CurrentSong';
import PlayBarInputs from './playBarInputs/PlayBarInputs';
import PlayBarVolume from './playbarVolume/PlayBarVolume';
import { useEffect } from 'react';
import { spotifyApi } from '../../../App';
import styles from './playbar.module.css';
import { useContext } from 'react';
import { TrackContext } from '../../providers/Sdk';

export default function PlayBar() {
    const track = useContext(TrackContext);
    const [currentTrackInfo, setCurrentTrack] = useState();

    const trackId = track?.playerState?.track_window?.current_track?.id;
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
