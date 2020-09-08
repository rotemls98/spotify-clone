

export const endpoint = "https://accounts.spotify.com/authorize";
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = window.location.origin;

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-top-read",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];


export const accessUrl = `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;