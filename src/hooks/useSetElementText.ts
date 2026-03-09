"use client";

export const useSetElementText = (
  ref: React.RefObject<HTMLElement> | null,
  text: string,
) => {
  const isClient = typeof document !== "undefined";
  if (!isClient || !ref) return;

  const el = ref.current;
  if (!el) return;

  el.textContent = text;
};
