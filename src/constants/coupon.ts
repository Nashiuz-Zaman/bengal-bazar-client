export const DiscountType = Object.freeze({
  PERCENTAGE: "PERCENTAGE",
  FLAT: "FLAT",
} as const);

export const CouponStatus = Object.freeze({
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const);


export type TDiscountType = (typeof DiscountType)[keyof typeof DiscountType];
export type TCouponStatus = (typeof CouponStatus)[keyof typeof CouponStatus];