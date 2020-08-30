import React from "react";
import { accessUrl } from "../../spotifyConfig";
import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.login}>
      <img
        src="https://2672686a4cf38e8c2458-2712e00ea34e3076747650c92426bbb5.ssl.cf1.rackcdn.com/2019-02-06-06-11-02.png"
        className={styles.loginLogo}
        alt="logo"
      />
      <button
        onClick={() => window.location.replace(accessUrl)}
        className={styles.loginButton}
      >
        התחברות
      </button>
    </div>
  );
}
