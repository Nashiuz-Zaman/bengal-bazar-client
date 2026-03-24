"use client";

import { CustomSwiper } from "@shared/CustomSwiper";
import { heroBanners } from "@/data/hero";
import { HeroSlide } from "./HeroSlide";
import { CaretLeftIcon } from "@icons/CaretLeftIcon";
import { CaretRightIcon } from "@icons/CaretRightIcon";

const NavigationButton = ({ direction }: { direction: "prev" | "next" }) => (
  <button
    className={`custom-swiper-${direction} w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer shadow-2xl active:scale-90`}
  >
    {direction === "prev" ? <CaretLeftIcon /> : <CaretRightIcon />}
  </button>
);

export const HeroSection = () => {
  return (
    <section className="relative mt-32 group w-full mx-auto overflow-hidden">
      <CustomSwiper
        data={heroBanners}
        renderItem={(banner) => <HeroSlide banner={banner} />}
        showPagination={true}
        showNavigation={true}
        loop={true}
        autoplay={true}
        spaceBetween={0}
        breakpoints={{
          0: { slidesPerView: 1 },
        }}
        innerContainerClassName="!py-0"
      />

      {/* 1. PAGINATION (Dashes) */}
      <div className="custom-pagination hidden absolute bottom-12! left-12! md:left-24! z-20 2md:flex items-center gap-2 w-fit!" />

      {/* 2. NAVIGATION (Arrows) */}
      <div className="absolute bottom-12! right-12! md:right-24! z-20 hidden md:flex gap-4">
        <NavigationButton direction="prev" />
        <NavigationButton direction="next" />
      </div>
    </section>
  );
};
