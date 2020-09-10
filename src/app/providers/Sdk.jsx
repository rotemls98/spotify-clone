import React, { useContext } from "react";
import useSetupPlayer from "./useSetupPlayer";

export const PlaybackContext = React.createContext(null);
export const PlayerContext = React.createContext(null);

export default function Sdk({ children }) {
  const { player, playback, isReady } = useSetupPlayer();
  return (
    <PlaybackContext.Provider value={playback}>
      <PlayerContext.Provider value={player}>
        {children(isReady)}
      </PlayerContext.Provider>
    </PlaybackContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

export function usePlayback() {
  return useContext(PlaybackContext);
}
