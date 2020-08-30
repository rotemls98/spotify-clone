import React from 'react';
import AppContent from './appContent/AppContent';
import AppMenu from './appMenu/AppMenu';
import Header from './header/Header';
import PlayBar from './playerbar/PlayBar';
import styles from './player.module.css';


export default function Player() {
    return (
        <div className={styles.player}>
            <Header/>
            <AppMenu/>
            <PlayBar/>
            <AppContent/>
        </div>
    )
}
