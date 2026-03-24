"use client";

import { OuterContainer } from "@containers/OuterContainer";
import { PromoMarquee } from "./blocks/PromoMarquee";
import { DesktopLinks } from "./blocks/DesktopLinks";
import dynamic from "next/dynamic";
import { BREAKPOINTS, useMediaQuery } from "@/hooks/useMediaQuery";
import { categories } from "@/dummy-data/nav";

// Lazy load both versions
const DesktopCategoryNav = dynamic(() =>
  import("./blocks/DesktopCategoryNav").then((mod) => mod.DesktopCategoryNav),
);

export const HeaderNavBar = () => {
  const is2md = useMediaQuery(BREAKPOINTS.max["2md"]!);

  return (
    <OuterContainer className="h-0 overflow-hidden 2md:overflow-visible 2md:h-12 flex items-center 2md:border-b border-neutral-100">
      {is2md === false && <DesktopCategoryNav categories={categories} />}
      
      <PromoMarquee className="hidden! 2md:flex! ml-4" />

      <DesktopLinks />
    </OuterContainer>
  );
};
