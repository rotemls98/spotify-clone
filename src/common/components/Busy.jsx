import React from "react";
import classNames from "classnames";
import styles from "./busy.module.css";

export default function Busy({ className, dotClassName, ...otherProps }) {
  return (
    <div className={classNames(className, styles.spinner)} {...otherProps}>
      <div className={classNames(styles.dot1, dotClassName)} />
      <div className={classNames(styles.dot2, dotClassName)} />
      <div className={dotClassName} />
    </div>
  );
}
