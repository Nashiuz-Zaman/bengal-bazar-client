"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Sync GSAP with page visibility
    const onVisibility = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        // This ensures animations don't "jump" forward to catch up
        // when the user returns to the tab
        gsap.globalTimeline.resume();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <>{children}</>;
}
