import { LinkBtnTrans } from "@buttons/LinkBtnTrans";

export const DesktopLinks = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`flex text-xs font-medium gap-6 text-neutral-500 2md:ml-auto ${className}`}
    >
      <LinkBtnTrans
        href="/track-order"
        className="hover:text-primary transition-colors flex items-center gap-1"
      >
        Track Order
      </LinkBtnTrans>

      <LinkBtnTrans
        href="/faq"
        className="hover:text-primary transition-colors"
      >
        FAQ
      </LinkBtnTrans>

      <LinkBtnTrans
        href="/returns"
        className="hover:text-primary transition-colors"
      >
        Returns
      </LinkBtnTrans>
    </div>
  );
};
