import { TProductVariant } from "@/features/product/types/product";
import { IApiResponse } from "@/types/shared";

export type TCartItem = {
  id: string;
  quantity: number;
  cartId: string;
  variantId: string;
  variant?: TProductVariant;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type TCart = {
  id: string;
  userId: string | null;

  // Array of items in the cart
  items: TCartItem[];

  couponCode: string | null;
  discount: string | number;
  tax: string | number;
  shippingFee: string | number;
  subtotal: string | number;
  total: string | number;

  totalItemQty: number;

  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export interface IAddItemToCartRequest {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface IUpdateCartQtyRequest {
  cartItemId: string;
  quantity: number;
}

export interface IRemoveCartItemRequest {
  cartItemId: string;
}

export interface IAddCouponRequest {
  couponCode: string;
}

export type TCartResponse = IApiResponse<{
  cart: TCart;
}>;
