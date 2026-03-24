"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface IPortalContextValue {
  setPortalTarget: (target: HTMLElement | null) => void;
  setElement: (node: ReactNode | null) => void;
  clear: () => void;
}

export const createPortalContext = () => {
  const PortalContext = createContext<IPortalContextValue | null>(null);

  const PortalProvider = ({ children }: { children: ReactNode }) => {
    const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
    const [element, setElement] = useState<ReactNode | null>(null);

    const clear = useCallback(() => {
      setElement(null);
      setPortalTarget(null);
    }, []);

    const value = useMemo(
      () => ({
        setPortalTarget,
        setElement,
        clear,
      }),
      [setPortalTarget, setElement, clear],
    );

    return (
      <PortalContext.Provider value={value}>
        {children}

        {/* Auto render when both exist */}
        {portalTarget && element ? createPortal(element, portalTarget) : null}
      </PortalContext.Provider>
    );
  };

  const usePortal = () => {
    const ctx = useContext(PortalContext);
    if (!ctx) {
      throw new Error("usePortal must be used inside PortalProvider");
    }
    return ctx;
  };

  return { PortalProvider, usePortal };
};
