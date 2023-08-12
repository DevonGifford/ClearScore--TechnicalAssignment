// useReadLocalStorage.ts
import { useEffect, useState } from "react";

type Value<T> = T | null;

export function useReadLocalStorage<T>(key: string): Value<T> {
  const [storedValue, setStoredValue] = useState<Value<T>>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      const parsedItem = item ? (JSON.parse(item) as T) : null;
      setStoredValue(parsedItem);

      // Trigger a custom event to notify components about changes
      const storageChangeEvent = new Event("storageChange");
      window.dispatchEvent(storageChangeEvent);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  return storedValue;
}
