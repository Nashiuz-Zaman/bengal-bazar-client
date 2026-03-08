export const ProductStatus = Object.freeze({
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const);

export type TProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];
