import { TCouponStatus, TDiscountType } from "@/constants/coupon";

export type TCoupon = {
  id: string;

  code: string;
  description?: string | null;

  discountType: TDiscountType;
  discountValue: string;

  startDate: string;
  expiryDate: string;

  usageLimit?: number | null;
  usedCount: number;

  minimumOrderAmount: string;

  status: TCouponStatus;

  createdAt: string;
  updatedAt: string;
};
