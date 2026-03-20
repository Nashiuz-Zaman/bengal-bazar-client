import { TProductVariant } from "./product";

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
