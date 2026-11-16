import { useRef, useCallback } from 'react';

export function useDebounce(callback, delay = 500) {
  const timerRef = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return [debouncedFn, cancel];
}

