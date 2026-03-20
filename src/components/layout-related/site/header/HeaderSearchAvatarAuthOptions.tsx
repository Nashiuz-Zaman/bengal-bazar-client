"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { HeaderProductsSearchbar } from "@layout-related/site/header/HeaderProductsSearchbar";
import { CartBtn } from "@buttons/CartBtn";
import { UserMenuWithoutAvatar } from "@shared/UserMenuWithoutAvatar";
import { UserMenuWithAvatar } from "@shared/UserMenuWithAvatar";
import { SearchbarProductCard } from "./SearchbarProductCard";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { useAuthState } from "@/providers/AuthStateProvider";
import { ISearchbarResultProduct } from "@/types/product";
import { useLazySearchbarResultsQuery } from "@api-slices/product.api.slice";
import { UserRole } from "@/constants/user";
import { useCartState } from "@/providers/CartStateProvider";

export const HeaderSearchAvatarAuthOptions = () => {
  const { logout } = useAuthMethods();
  const { user } = useAuthState();
  const { cart } = useCartState();

  // 1. Auth & Role Logic
  const { isAdmin, isCustomer, isAuthenticated } = useMemo(() => {
    const roleName = user?.role;
    const admin =
      roleName === UserRole.ADMIN || roleName === UserRole.SUPERADMIN;

    return {
      isAdmin: admin,
      isCustomer: roleName === UserRole.CUSTOMER && !admin,
      isAuthenticated: !!user && !!user.id,
    };
  }, [user]);

  // 2. Search Logic
  const [triggerSearch, { data, isFetching, isSuccess }] =
    useLazySearchbarResultsQuery();

  const results = useMemo(
    () => (!isFetching && isSuccess && data?.data?.products) || [],
    [isFetching, isSuccess, data],
  );

  const renderResult = (
    item: ISearchbarResultProduct,
    _index: number,
    onClick: () => void,
  ): React.ReactNode => (
    <SearchbarProductCard
      onClick={onClick}
      title={item.title}
      slug={item?.slug}
      src={item.image}
    />
  );

  return (
    <>
      {/* Desktop search bar */}
      <HeaderProductsSearchbar<ISearchbarResultProduct>
        results={results}
        renderResult={renderResult}
        showIcon
        trigger={triggerSearch}
        modalClassName="productSearchbarModal"
      />

      <div className="ml-auto flex items-center gap-4 font-medium text-sm">
        {/* Auth / User menu */}
        {!isAuthenticated ? (
          <>
            <Link className="hover:underline" href="/auth/login">
              Login
            </Link>
            <Link className="hover:underline" href="/auth/signup">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {isAdmin && <UserMenuWithoutAvatar logoutFunction={logout} />}
            {isCustomer && user && (
              <UserMenuWithAvatar userData={user} logoutFunction={logout} />
            )}
          </>
        )}

        <CartBtn itemsQty={cart?.totalItemQty || 0} />
      </div>
    </>
  );
};
