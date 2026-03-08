export const TransactionType = Object.freeze({
  PAYMENT: "PAYMENT",
  REFUND: "REFUND",
} as const);

export const TransactionStatus = Object.freeze({
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
} as const);

export type TTransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];
export type TTransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];
