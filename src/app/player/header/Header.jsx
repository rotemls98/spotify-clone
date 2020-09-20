import React, { useEffect, useState } from "react";
import NavigationButtons from "./navigationButtons/NavigationButtons";
import CurrentUserSelect from "./currentUserSelect/CurrentUserSelect";
import styles from "./header.module.css";

export default function Header({ containerRef, headerRef }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let threshold = [];
    let parts = 24;
    let rest = 64 - parts;
    for (let i = 0; i < parts; i++) {
      threshold.push(1 - i / 64);
    }
    threshold.push(1);
    let options = {
      root: containerRef.current,
      threshold,
    };
    let observer = new window.IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= rest / 64) {
        const ratio =
          (parts / 64 - (entry.intersectionRatio - rest / 64)) / 0.375;
        setOpacity(ratio);
      } else {
        setOpacity(1);
      }
    }, options);

    window.observer = observer;
    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, [containerRef, headerRef]);

  const style = { backgroundColor: `rgba(8, 8, 8, ${opacity})` };
  return (
    <div className={styles.header} style={style}>
      <NavigationButtons />
      <CurrentUserSelect />
    </div>
  );
}
