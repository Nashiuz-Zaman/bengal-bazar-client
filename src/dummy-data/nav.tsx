import { ICategory } from "@/types/category";

export const categories: ICategory[] = [
  {
    id: "cat_1",
    categoryName: "electronics",
    categoryDisplayName: "Electronics",
    icon: "mdi:laptop",
    subCategories: [
      {
        id: "sub_1",
        subCategoryName: "smartphones",
        subCategoryDisplayName: "Smartphones",
        categoryId: "cat_1",
      },
      {
        id: "sub_2",
        subCategoryName: "laptops",
        subCategoryDisplayName: "Laptops",
        categoryId: "cat_1",
      },
      {
        id: "sub_3",
        subCategoryName: "headphones",
        subCategoryDisplayName: "Headphones",
        categoryId: "cat_1",
      },
    ],
  },
  {
    id: "cat_2",
    categoryName: "fashion",
    categoryDisplayName: "Fashion",
    icon: "mdi:tshirt-crew",
    subCategories: [
      {
        id: "sub_4",
        subCategoryName: "mens-clothing",
        subCategoryDisplayName: "Men's Clothing",
        categoryId: "cat_2",
      },
      {
        id: "sub_5",
        subCategoryName: "womens-clothing",
        subCategoryDisplayName: "Women's Clothing",
        categoryId: "cat_2",
      },
      {
        id: "sub_6",
        subCategoryName: "shoes",
        subCategoryDisplayName: "Shoes",
        categoryId: "cat_2",
      },
    ],
  },
  {
    id: "cat_3",
    categoryName: "home-kitchen",
    categoryDisplayName: "Home & Kitchen",
    icon: "mdi:sofa",
    subCategories: [
      {
        id: "sub_7",
        subCategoryName: "furniture",
        subCategoryDisplayName: "Furniture",
        categoryId: "cat_3",
      },
      {
        id: "sub_8",
        subCategoryName: "kitchen-appliances",
        subCategoryDisplayName: "Kitchen Appliances",
        categoryId: "cat_3",
      },
      {
        id: "sub_9",
        subCategoryName: "decor",
        subCategoryDisplayName: "Home Decor",
        categoryId: "cat_3",
      },
    ],
  },
  {
    id: "cat_4",
    categoryName: "beauty",
    categoryDisplayName: "Beauty & Personal Care",
    icon: "map:beauty-salon",
    subCategories: [
      {
        id: "sub_10",
        subCategoryName: "skincare",
        subCategoryDisplayName: "Skincare",
        categoryId: "cat_4",
      },
      {
        id: "sub_11",
        subCategoryName: "haircare",
        subCategoryDisplayName: "Haircare",
        categoryId: "cat_4",
      },
      {
        id: "sub_12",
        subCategoryName: "makeup",
        subCategoryDisplayName: "Makeup",
        categoryId: "cat_4",
      },
    ],
  },
  {
    id: "cat_5",
    categoryName: "sports",
    categoryDisplayName: "Sports & Outdoors",
    icon: "mdi:football",
    subCategories: [
      {
        id: "sub_13",
        subCategoryName: "fitness-equipment",
        subCategoryDisplayName: "Fitness Equipment",
        categoryId: "cat_5",
      },
      {
        id: "sub_14",
        subCategoryName: "outdoor-gear",
        subCategoryDisplayName: "Outdoor Gear",
        categoryId: "cat_5",
      },
      {
        id: "sub_15",
        subCategoryName: "sportswear",
        subCategoryDisplayName: "Sportswear",
        categoryId: "cat_5",
      },
    ],
  },
];
