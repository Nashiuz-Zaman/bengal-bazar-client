export type TBrand = {
  id: string;

  brandName: string;
  brandDisplayName: string;
  brandLogoUrl?: string | null;
  brandDescription?: string | null;
  brandWebsite?: string | null;

  createdAt: string;
  updatedAt: string;
};
