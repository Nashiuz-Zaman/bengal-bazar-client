import Image from "next/image";
import { IHeroBanner } from "@/data/hero";
import { LinkBtn } from "@/components/shared/buttons/LinkBtn";
import { ButtonBtn } from "@/components/shared/buttons/ButtonBtn";

interface IHeroSlideProps {
  banner: IHeroBanner;
}

export const HeroSlide = ({ banner }: IHeroSlideProps) => {
  return (
    <div className="relative w-full h-full aspect-16/20 sm:aspect-16/15 2md:aspect-16/11.5! xl:aspect-16/7! overflow-hidden">
      {/* Optimized Background Image */}
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        priority
        className="object-cover object-[50%_35%] saturate-120 brightness-115"
        sizes="100vw"
        quality={75}
      />

      {/* Gradient Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 xl:via-black/5 to-transparent" />

      {/* Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <span
            className={`inline-block px-4 py-2 rounded-full ${banner.themeColor} text-white text-2xs md:text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-lg`}
          >
            {banner.badge}
          </span>

          {/* Headline with Conditional Highlights */}
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4 md:mb-6 drop-shadow-xl">
            {banner.title}
          </h1>

          {/* Subtext */}
          <p className="text-neutral-100 text-sm md:text-lg mb-8 md:mb-12 max-w-lg leading-relaxed drop-shadow-md">
            {banner.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <LinkBtn className="primary-classes shadow-xl shadow-emerald-900/30">
              {banner.btnPrimary} <span className="text-xl">→</span>
            </LinkBtn>

            <ButtonBtn className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/30 text-white font-bold transition-all active:scale-95">
              {banner.btnSecondary}
            </ButtonBtn>
          </div>
        </div>
      </div>
    </div>
  );
};
