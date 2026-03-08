import { TProductStatus } from "@/constants/product";

export type TProductSpecification = {
  key: string;
  value: string;
};

export type TProduct = {
  id: string;

  productSlug: string;
  productDisplayName: string;

  productBrandId: string;
  categoryId: string;
  subCategoryId: string;

  warrantyAndSupport: string;
  productDetails?: string | null;

  status: TProductStatus;

  specifications: TProductSpecification[];

  seoTitle?: string | null;
  seoDescription?: string | null;
  metaKeywords?: string | null;
  tags?: string | null;
  canonicalUrl?: string | null;

  globalVideos: string[];
  globalImages: string[];

  createdAt: string;
  updatedAt: string;
};

export type TVariantAttributes = Record<string, string>;

export type TProductVariant = {
  id: string;

  variantName: string;
  sku: string;

  stock: number;

  unitSalesPrice: string;
  unitDiscount: string;
  discountSalesPrice: string;

  variantVideos: string[];
  variantImages: string[];

  attributes: TVariantAttributes;

  productId: string;

  createdAt: string;
  updatedAt: string;
};
