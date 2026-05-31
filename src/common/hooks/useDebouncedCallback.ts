import { useRef, useCallback, useEffect } from "react";

export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 2. The "Latest Ref" Pattern: Store the latest callback in a ref
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
      cancel(); // Reuse the cancel logic here
      timer.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay, cancel], // Notice 'callback' is NO LONGER a dependency!
  );

  useEffect(() => cancel, [cancel]);

  return [debouncedFn, cancel] as const;
};
