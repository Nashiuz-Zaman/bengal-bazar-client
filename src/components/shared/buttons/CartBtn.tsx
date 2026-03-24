"use client";

import { CartIcon } from "../icons/CartIcon";
import { LinkBtnTrans } from "@/components/shared/buttons/LinkBtnTrans";

export const CartBtn = ({
  href = "/cart",
  className = "",
  itemsQty = 0,
}: {
  href?: string;
  className?: string;
  itemsQty?: number;
}) => {
  return (
    <div title="Go To Cart Page" className={`relative ${className}`}>
      {itemsQty > 0 && (
        <p className="absolute p-1 h-6 min-w-6 grid place-content-center -top-3 text-2xs md:text-xs left-full -translate-x-3 bg-red-600 rounded-full text-neutral-50">
          {itemsQty}
        </p>
      )}

      <LinkBtnTrans href={href} className="flex flex-col items-center gap-1!">
        <CartIcon className="text-3xl" />
        <span className="hidden lg:inline-block">Cart</span>
      </LinkBtnTrans>
    </div>
  );
};
