import React from "react";
import NavigationButtons from "./navigationButtons/NavigationButtons";
import CurrentUserSelect from "./currentUserSelect/CurrentUserSelect";
import styles from "./header.module.css";

export default function Header() {

  return (
    <div className={styles.header}>
      <NavigationButtons/>
      <CurrentUserSelect/>
    </div>
  );
}
