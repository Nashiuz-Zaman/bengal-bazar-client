"use client";

import { createContext, ReactNode, useContext } from "react";
import {
  IAddCouponRequest,
  IAddItemToCartRequest,
  IRemoveCartItemRequest,
  IUpdateCartQtyRequest,
  TCartResponse,
  useAddCouponToCartMutation,
  useAddItemToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveCouponFromCartMutation,
  useRemoveItemFromCartMutation,
  useUpdateCartItemQtyMutation,
} from "@api-slices/cart.api.slice";
import { TCart } from "@/types/cart";

import { showToast } from "@/utils/showToast";
import { catchAsyncClient } from "@/utils/catchAsyncClient";

export interface ICartStateContext {
  cart: TCart;
  isCartBusy: boolean;
  addProductToCart: (args: any) => Promise<any>;
  updateCartItemQuantity: (args: any) => Promise<any>;
  removeCartItem: (args: any) => Promise<any>;
  clearCartItems: (args: any) => Promise<any>;
  applyCoupon: (args: any) => Promise<any>;
  removeCoupon: () => Promise<any>;
}

export const CartStateContext = createContext<ICartStateContext | undefined>(
  undefined,
);

export interface ICartStateProviderProps {
  children: ReactNode;
}

export const CartStateProvider = ({ children }: ICartStateProviderProps) => {
  const { isLoading, data } = useGetCartQuery();

  /* ---------------- MUTATIONS ---------------- */

  const [addItemToCart, { isLoading: adding }] = useAddItemToCartMutation();

  const [updateCartItemQty, { isLoading: updating }] =
    useUpdateCartItemQtyMutation();

  const [removeItemFromCart, { isLoading: removing }] =
    useRemoveItemFromCartMutation();

  const [clearCart, { isLoading: clearing }] = useClearCartMutation();

  const [addCouponToCart, { isLoading: applyingCoupon }] =
    useAddCouponToCartMutation();

  const [removeCouponFromCart, { isLoading: removingCoupon }] =
    useRemoveCouponFromCartMutation();

  /* ---------------- LOADING STATE ---------------- */

  const isCartMutating =
    adding ||
    updating ||
    removing ||
    clearing ||
    applyingCoupon ||
    removingCoupon;

  /* ---------------- TOAST ---------------- */

  const showCartUpdateSuccessToast = (result: TCartResponse) => {
    if (result?.success && result?.message) {
      showToast({
        message: result.message,
        position: "top-center",
      });
    }
  };

  /* ---------------- ACTIONS ---------------- */

  const addProductToCart = catchAsyncClient(async (args) => {
    const data = args?.data as IAddItemToCartRequest;
    const result = await addItemToCart(data).unwrap();
    showCartUpdateSuccessToast(result);
  });

  const updateCartItemQuantity = catchAsyncClient(async (args) => {
    const data = args?.data as IUpdateCartQtyRequest;
    const result = await updateCartItemQty(data).unwrap();
    showCartUpdateSuccessToast(result);
  });

  const removeCartItem = catchAsyncClient(async (args) => {
    const data = args?.data as IRemoveCartItemRequest;
    const result = await removeItemFromCart(data).unwrap();
    showCartUpdateSuccessToast(result);
  });

  const clearCartItems = catchAsyncClient(async () => {
    const result = await clearCart().unwrap();
    showCartUpdateSuccessToast(result);
  });

  const applyCoupon = catchAsyncClient(
    async (args) => {
      const data = args?.data as IAddCouponRequest;

      const result = await addCouponToCart(data).unwrap();
      showCartUpdateSuccessToast(result);
    },
    {
      handleError: "throw",
    },
  );

  const removeCoupon = catchAsyncClient(
    async () => {
      const result = await removeCouponFromCart().unwrap();
      showCartUpdateSuccessToast(result);
    },
    {
      handleError: "throw",
    },
  );

  const value: ICartStateContext = {
    cart: data?.data?.cart as TCart,
    isCartBusy: isLoading || isCartMutating,

    addProductToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCartItems,
    applyCoupon,
    removeCoupon,
  };

  return <CartStateContext value={value}>{children}</CartStateContext>;
};

export const useCartState = (): ICartStateContext => {
  const context = useContext(CartStateContext);

  if (!context) {
    throw new Error("useCartState must be used within a <CartStateProvider>");
  }

  return context;
};
