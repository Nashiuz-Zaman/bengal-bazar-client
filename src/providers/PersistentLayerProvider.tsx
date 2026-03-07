"use client";

import { createContext, HTMLAttributes, useContext, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);
import { usePathname, useRouter } from "next/navigation";

interface ILayerContext {
  exit: (route?: string) => void;
}

export const LayerContext = createContext<ILayerContext | undefined>(undefined);

export const usePersistentLayer = () => {
  const context = useContext(LayerContext);
  if (!context)
    throw new Error(
      "usePersistentLayer must be used inside PersistentLayerProvider",
    );
  return context;
};

interface IPersistentLayerProviderProps extends HTMLAttributes<HTMLDivElement> {
  aboveChildren?: React.ReactNode;
  children: React.ReactNode;
  belowChilden?: React.ReactNode;
}

// exit/enter animation duration
export const enterDuration = 0.5;
export const exitDuration = 0.5;

export const PersistentLayerProvider = ({
  aboveChildren,
  children,
  belowChilden,
  ...props
}: IPersistentLayerProviderProps) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Exit animation on route change
  const exit = (route?: string) => {
    if (!layerRef.current || !route) return;

    if (pathname === route) return;

    const tl = gsap.timeline();

    tl.to(
      layerRef.current,
      {
        x: "-20%",
        opacity: 0,
        duration: exitDuration,
        ease: "power4.out",
        onComplete: () => router.push(route, { scroll: false }),
      },
      0,
    ).to(
      window,
      {
        scrollTo: 0,
        duration: exitDuration,
        ease: "power4.out",
      },
      0,
    );
  };

  useGSAP(
    () => {
      if (!layerRef.current) return;

      const tl = gsap.timeline({ onComplete: () => ScrollTrigger.refresh() });

      tl.set(layerRef.current, {
        x: "20%",
        opacity: 0,
      });

      tl.to(layerRef.current, {
        x: "0%",
        opacity: 1,
        duration: enterDuration,
        ease: "power3.out",
      });
    },
    { dependencies: [pathname] },
  );

  const { className, ...rest } = props;

  return (
    <LayerContext value={{ exit }}>
      {aboveChildren && aboveChildren}

      <div
        ref={layerRef}
        className={`w-full h-max top-0 translate-x-[20%] opacity-0 left-0 right-0 bg-site-bg will-change-transform ${className}`}
        {...rest}
      >
        {children}
      </div>

      {belowChilden && belowChilden}
    </LayerContext>
  );
};
