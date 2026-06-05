import { useRef, useCallback, useEffect } from "react";

export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);


  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      cancel(); 
      timer.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay, cancel], 
  );

  useEffect(() => cancel, [cancel]);

  return [debouncedFn, cancel] as const;
};
