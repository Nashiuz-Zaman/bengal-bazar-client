"use client";

import Marquee from "react-fast-marquee";

export const PromoMarquee = ({ className = "" }: { className?: string }) => {
  return (
    <Marquee
      speed={30}
      className={`overflow-hidden! w-full! 2md:w-1/2! xl:max-w-120 ${className}`}
    >
      <p className="[font-size:inherit] font-medium 2md:font-normal md:text-left capitalize text-neutral-600 ml-4 flex items-center">
        USE
        <span className="text-secondary font-bold px-1.5 py-0.5 bg-primary-light rounded text-[0.7em] ml-1">
          LUCKY50
        </span>
        <span className="ml-1">to get 50% OFF on orders above TK 7000</span>
      </p>
    </Marquee>
  );
};
