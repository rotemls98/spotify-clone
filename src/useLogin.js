import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import spotifyApi from "./api";
import { accessUrl } from "./spotifyConfig";

export function useLogin() {
  const location = useLocation();
  const [user, setUser] = useState();
  const [authorization, setAuthorization] = useLocalStorage("token");
  const [error, setError] = useState();
  const { hash, search } = location;
  const [loading, setLoading] = useState(
    () => hash.length > 1 || Object.keys(authorization).length > 0
  );

  useEffect(() => {
    if (hash && Object.keys(authorization).length === 0) {
      const hashValue = readFromHash(hash);
      debugger;
      window.location.hash = "";
      if (Object.keys(hashValue).length > 0) {
        const { access_token: token, expires_in: expires } = hashValue;
        setAuthorization({ token, expires: Date.now() + expires * 1000 });
      }
    }
  }, [hash, setAuthorization, authorization]);

  useEffect(() => {
    const setApiTokenAndGetUser = (token) => {
      spotifyApi.setAccessToken(token);
      spotifyApi
        .getMe()
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .catch((res) => {
          if (res.status === 401) {
            setAuthorization(null);
            window.location.assign(accessUrl);
          }
          setLoading(false);
        });
    };

    if (Object.keys(authorization).length > 0) {
      window.location.hash = "";
      const now = Date.now();
      const { token, expires } = authorization;
      if (!token || now > expires) {
        setAuthorization(null);
        window.location.assign(accessUrl);
      } else {
        setApiTokenAndGetUser(token);
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
    setAuthorization(null);
    window.location.replace(`${window.location.origin}/login`);
  }, [setAuthorization]);

  return { user, error, loading, disconnect };
}

function readFromHash(hash) {
  const hashValue = {};
  let keyAndValue = hash.substring(1).split("&");
  keyAndValue.forEach((item) => {
    const [key, value] = item.split("=");
    hashValue[key] = value;
  });

  return hashValue;
}
