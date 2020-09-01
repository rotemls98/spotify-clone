import React, { Fragment, useReducer } from "react";
import { useEffect } from "react";
import { promisify, loadScript } from "../../utils/utils";
import { spotifyApi } from "../../App";
import currentTrack from "./currentTrack";
import useSetupPlayer from "./useSetupPlayer";

export const TrackContext = React.createContext();

export default function Sdk({ children }) {
  const {state: track, dispatch} = useSetupPlayer();
  return (
    <TrackContext.Provider value={track}>{children}</TrackContext.Provider>
  );
}
