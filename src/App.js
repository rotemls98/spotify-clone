import React, { useEffect, useState, useCallback, useMemo } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./app/login/Login";
import Player from "./app/player/Player";
import useLocalStorage from "./hooks/useLocalStorage";
import { accessUrl } from "./spotifyConfig";
import { CurrentUserContext } from "./app/CurrentUserContext";
import Sdk from "./app/providers/Sdk";

export const spotifyApi = new SpotifyWebApi();

const useLogin = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useLocalStorage("token");
  const [loading, setLoading] = useState(
    !!token || window.location.hash.length > 1
  );

  useEffect(() => {
    if (!token) {
      const url = new URL(window.location.href);
      const response = url.hash.split("&");
      const urlToken = response[0].split("=")[1];
      window.location.hash = "";
      if (urlToken) {
        setToken(urlToken);
      }
    }
  }, [token, setToken]);

  useEffect(() => {
    if (token) {
      window.location.hash = "";
      spotifyApi.setAccessToken(token);
      spotifyApi
        .getMe()
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .catch((res) => {
          // token expired or invalid
          if (res.status === 401 || res instanceof TypeError) {
            setToken("");
            window.location.replace(accessUrl);
          }
        });
    }
  }, [token, setToken]);

  const disconnect = useCallback(() => {
    setToken("");
    window.location.replace(window.location.origin);
  }, [setToken]);

  return { user, loading, token, disconnect };
};

function App() {
  const { user, loading, token, disconnect } = useLogin();
  const firstLogin = !token && !loading;
  const login = useMemo(() => ({ user, disconnect }), [user, disconnect]);

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={login}>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            {firstLogin && <Redirect to="/login" />}
            {user && (
              <Route path="/">
                <Sdk>
                <Player />
                </Sdk>
              </Route>
            )}
          </Switch>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
