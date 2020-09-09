import { useState, useCallback } from "react";

export default function useLocalStorage(key, initialValue = {}) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        if (value === null || value === undefined) {
          window.localStorage.removeItem(key);
          setStoredValue({});
        } else {
          setStoredValue(value);
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
