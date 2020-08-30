import React, { useState, useEffect } from "react";
import Icon from "../../../../common/components/Icon";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { useHistory } from "react-router";
import styles from "./navigationButtons.module.css";

const useTravelHistory = () => {
  const history = useHistory();
  const [{ back, forward }, setHistoryActions] = useState({
    back: 0,
    forward: 0,
  });

  useEffect(() => {
    const keys = [history.location.key];
    let previousKey;

    function goBack() {
      setHistoryActions((prev) => ({
        back: prev.back - 1,
        forward: prev.forward + 1,
      }));
    }

    function goForward() {
      setHistoryActions((prev) => ({
        back: prev.back + 1,
        forward: prev.forward - 1,
      }));
    }

    function push() {
      setHistoryActions((prev) => ({ forward: 0, back: prev.back + 1 }));
    }

    const unlisten = history.listen((location, action) => {
      const { key } = location;
      let isBack;
      if (!key) {
        isBack = true;
      } else if (!keys.includes(key)) {
        keys.push(key);
        isBack = false;
      } else if (keys.indexOf(key) < keys.indexOf(previousKey)) {
        isBack = true;
      } else {
        isBack = false;
      }
      if (action === "POP") {
        if (isBack) {
          goBack();
        } else {
          goForward();
        }
      } else if (action === "PUSH") {
        push();
      }
      previousKey = key;
    });

    return unlisten;
  }, [history]);

  const canGoBack = forward >= 0 ? back > 0 : false;
  const canGoForward = forward > 0 || forward < 0;

  return { history, canGoBack, canGoForward };
};

export default function NavigationButtons() {
  const { canGoForward, canGoBack, history } = useTravelHistory();
  return (
    <div className={styles.buttons}>
      <button
        disabled={!canGoBack}
        onClick={history.goBack}
        className={styles.historyButton}
      >
        <Icon path={mdiChevronRight} />
      </button>
      <button
        disabled={!canGoForward}
        onClick={history.goForward}
        className={styles.historyButton}
      >
        <Icon path={mdiChevronLeft} />
      </button>
    </div>
  );
}
