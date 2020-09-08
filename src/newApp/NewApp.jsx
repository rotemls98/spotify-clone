import React, { useState, useMemo, useCallback } from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";
import spotifyApi from "../api";
import { accessUrl } from "../spotifyConfig";
import Sdk from "../app/providers/Sdk";
import Player from "../app/player/Player";
import Login from "../app/login/Login";
import { CurrentUserContext } from "../app/CurrentUserContext";

const readFromHash = (hash) => {
  const hashValue = {};
  let keyAndValue = hash.substring(1).split("&");
  keyAndValue.forEach((item) => {
    const [key, value] = item.split("=");
    hashValue[key] = value;
  });

  return hashValue;
};

export default function NewApp() {
  const location = useLocation();
  const { hash, search } = location;
  const [user, setUser] = useState(null);
  const [authorization, setAuthorization] = useLocalStorage("token");
  const [loading, setLoading] = useState(
    hash.length > 1 || Object.keys(authorization).length > 0
  );

  const [error, setError] = useState();

  useEffect(() => {
    if (hash) {
      const hashValue = readFromHash(hash);
      window.location.hash = '';
      if (Object.keys(hashValue).length > 0) {
        const { access_token: token, expires_in: expires } = hashValue;
        setAuthorization({ token, expires: Date.now() + expires * 1000 });
        spotifyApi.setAccessToken(token);
        spotifyApi.getMe().then((user) => {
          setUser(user);
          setLoading(false);
        });
      }
    }
  }, [hash], setAuthorization);

  useEffect(() => {
    if (authorization) {
      const now = Date.now();
      const { token, expires } = authorization;
      if (now > expires) {
        window.location.assign(accessUrl);
      } else {
        spotifyApi.setAccessToken(token);
        spotifyApi
          .getMe()
          .then((user) => {
            setUser(user);
            setLoading(false);
          })
          .catch((res) => {
            if (res.status === 401) {
              setAuthorization("");
              window.location.assign(accessUrl);
            }
            setLoading(false);
          });
      }
    }
  }, [authorization, setAuthorization]);

  useEffect(() => {
    if (search) {
      const searchParams = new URLSearchParams(search);
      setError(searchParams.get("error"));
    }
  }, [search]);

  const disconnect = useCallback(() => {
    setAuthorization("");
    window.location.replace(window.location.origin);
  }, [setAuthorization]);
  
  const login = useMemo(() => ({ user, disconnect }), [user, disconnect]);
  return (
    <Switch>
      <Route path="/login">
        <Login error={error} />
      </Route>
      <Route path="/">
        {error && <Redirect to="/login"></Redirect>}
        {!loading ? (
          user ? (
            <div data-testid="main-app">
              <CurrentUserContext.Provider value={login}>
                <Sdk>
                  <Player />
                </Sdk>
              </CurrentUserContext.Provider>
            </div>
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <div>loading</div>
        )}
      </Route>
    </Switch>
  );
}
