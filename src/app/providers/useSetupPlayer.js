import { useReducer, useEffect } from "react";
import currentTrack, { actions } from "./currentTrack";
import { spotifyApi } from "../../App";
import { loadScript } from "../../utils/utils";

export default function useSetupPlayer() {
  const [state, dispatch] = useReducer(currentTrack, {
    playerState: null,
    isPlayerReady: false,
    deviceId: null,
    loading: false,
    error: null,
  });

  const { deviceId } = state;
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Rotem's Player",
        getOAuthToken: (cb) => cb(spotifyApi.getAccessToken()),
      });

      window.player = player;

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("player_state_changed", (state) => {
        dispatch({
          type: actions.SET_PLAYER_STATE,
          playerState: state,
        });

        console.log(state);
      });

      player.addListener("ready", ({ device_id }) => {
        dispatch({
          type: actions.PLAYER_READY,
          device_id,
        });

        console.log("ready", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID is not ready for playback", device_id);
      });

      player.connect();
    };

    loadScript("https://sdk.scdn.co/spotify-player.js");
  }, []);

  useEffect(() => {
    if (deviceId) {
      spotifyApi.transferMyPlayback([deviceId], {play: false});
    }
  }, [deviceId]);

  return { state, dispatch };
}
