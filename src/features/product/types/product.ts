import { TProductStatus } from "@/constants/product";
import { IMultipleResourceQueryParams } from "@/types/shared";

export type TProductSpecification = {
  key: string;
  value: string;
};

// ---------------------------------------------------------
// PRODUCT
// ---------------------------------------------------------
export interface IProduct {
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
}

export type TVariantAttributes = Record<string, string>;

// ---------------------------------------------------------
// PRODUCT Variant
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// SEARCHBAR RESULT PRODUCT
// Minimal product info for search dropdowns
// ---------------------------------------------------------
export interface ISearchbarResultProduct {
  // Maps to productDisplayName from TProduct
  title: IProduct["productDisplayName"];

  // We use TProduct["globalImages"] to get the string[] type
  image: IProduct["globalImages"][number];
  slug: IProduct["productSlug"];
  id: IProduct["id"];
}

// ---------------------------------------------------------
// PRODUCT FORM PROPS
// Props for create/edit product forms
// ---------------------------------------------------------
export interface IProductFormProps {
  mode?: "create" | "edit";
  product?: IProduct;
}

// ---------------------------------------------------------
// UPDATE PRODUCT ARGUMENTS
// Used when updating an existing product
// ---------------------------------------------------------
export interface IUpdateProductArgs {
  id: IProduct["id"];
  data: Partial<IProduct>;
}

export interface IProductSearchQueryParams extends IMultipleResourceQueryParams {
  form?: boolean;
}
