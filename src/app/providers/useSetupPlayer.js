import { useEffect, useState } from "react";
import spotifyApi from "../../api";
import { loadScript } from "../../utils/utils";

export default function useSetupPlayer() {
  const [deviceId, setDeviceId] = useState("");
  const [playback, setPlayback] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Rotem's Player",
        getOAuthToken: (cb) => cb(spotifyApi.getAccessToken()),
      });

      setPlayer(player);

      player.addListener("initialization_error", ({ message }) =>
        setError(message)
      );
      player.addListener("authentication_error", ({ message }) =>
        setError(message)
      );
      player.addListener("account_error", ({ message }) => setError(message));
      player.addListener("playback_error", ({ message }) => setError(message));
      player.addListener("player_state_changed", (state) => {
        setPlayback(state);
      });

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        setIsReady(true);
      });

      player.addListener("unready", () => setIsReady(false));

      player.connect();
    };

    loadScript("https://sdk.scdn.co/spotify-player.js").catch((error) =>
      setError(error)
    );
  }, []);

  useEffect(() => {
    if (deviceId) {
      spotifyApi.transferMyPlayback([deviceId], { play: false });
    }
  }, [deviceId]);

  return { player, playback, isReady, error };
}
