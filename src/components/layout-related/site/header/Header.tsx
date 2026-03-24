import { HeaderTopbar } from "./HeaderTopbar";
import { HeaderNavBar } from "./HeaderNavBar";
import { PromoMarquee } from "./blocks/PromoMarquee";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-2 w-full bg-white">
      <PromoMarquee className="py-2 border-b border-neutral-100 text-xs 2md:hidden!" />
      {/* Logo, search, avatar menu */}
      <HeaderTopbar />

      {/* Categories & Info */}
      <HeaderNavBar />
    </header>
  );
};
