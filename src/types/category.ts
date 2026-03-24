export interface ISubCategory {
  id: string;
  subCategoryName: string;
  subCategoryDisplayName: string;
  categoryId: string;
}

export interface ICategory {
  id: string;
  categoryName: string;
  categoryDisplayName: string;
  icon: string;
  subCategories: ISubCategory[];
}

export interface ICategoryNavProps {
  categories: ICategory[];
}
