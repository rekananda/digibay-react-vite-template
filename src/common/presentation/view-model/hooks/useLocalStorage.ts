import { useEffect, useState } from "react";

type SetValue<T> = T | ((val: T) => T);

export default function useLocalstorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        const parseItem = (item: string) => {
          try {
            return JSON.parse(item);
          } catch (error) {
            return item;
          }
        };
        
        return item ? parseItem(item) : initialValue;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}