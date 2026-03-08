export const AddressType = Object.freeze({
  SHIPPING: "SHIPPING",
  BILLING: "BILLING",
} as const);

export type TAddressType = (typeof AddressType)[keyof typeof AddressType];
