import React, { useMemo } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Player from "./app/player/Player";
import Login from "./app/login/Login";
import { CurrentUserContext } from "./app/CurrentUserContext";
import { useLogin } from "./useLogin";
import Busy from "./common/components/Busy";
import styles from "./app.module.css";

export default function NewApp() {
  const { user, loading, error, disconnect } = useLogin();

  const login = useMemo(() => ({ user, disconnect }), [user, disconnect]);

  return (
    <div className={styles.app}>
      <Switch>
        <Route path="/login">
          <Login error={error} />
        </Route>
        <Route path="/">
          {error && <Redirect to="/login"></Redirect>}
          {!loading ? (
            user ? (
                <CurrentUserContext.Provider value={login}>
                  <Player />
                </CurrentUserContext.Provider>
            ) : (
              <Redirect to="/login" />
            )
          ) : (
            <Busy data-testid="login-busy" className={styles.busy} />
          )}
        </Route>
      </Switch>
    </div>
  );
}
