export enum EProductCategory {
  MALE = 'male',
  FEMALE = 'female',
  CHILDREN = 'children',
}

export enum EProductSubCategory {
  T_SHIRTS = 't-shirts',
  HOODIES = 'hoodies',
  SWIMWEAR = 'swimwear',
}

export interface IProduct {
  category: EProductCategory;
  subCategory: EProductSubCategory;
  title: string;
  subTitle: string;
  price: string;
  description: string;
  sizes: { size: string; pieces: string }[];
  images: string[];
}
