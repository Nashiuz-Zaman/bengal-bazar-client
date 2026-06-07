"use client";

import { RefObject, useMemo } from "react";
import { useResizeObserver } from "./useResizeObserver";
import { getHeight } from "@/common/utils/getHeight";
import { useScreenSize } from "./useScreenSize";

interface IUseDynamicHeightOptions {
  refElements?: (RefObject<HTMLElement> | null)[];
  fixedHeights?: number[];
}

export const useDynamicHeight = ({
  refElements = [],
  fixedHeights = [],
}: IUseDynamicHeightOptions) => {
  const { height: screenHeight } = useScreenSize();
  const entries = useResizeObserver(refElements);

  const dynamicHeight = useMemo(() => {
    if (!screenHeight || entries.includes(null)) return null;

    const refsHeight = entries
      .filter((entry): entry is ResizeObserverEntry => entry !== null)
      .reduce((sum, entry) => sum + getHeight(entry), 0);

    const fixed = fixedHeights.reduce((sum, h) => sum + h, 0);

    return screenHeight - refsHeight - fixed;
  }, [screenHeight, entries, fixedHeights]);

  return dynamicHeight;
};
