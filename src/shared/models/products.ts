export enum EProductCategory {
  MALE = 'male',
  FEMALE = 'female',
  CHILDREN = 'children',
}

export enum EProductSubCategory {
  T_SHIRTS = 'T-SHIRTS',
  HOODIES = 'HOODIES',
}

export interface IProduct {
  category: EProductCategory;
  subCategory: EProductSubCategory;
  title: string;
  subTitle: string;
  price: string;
  description: string;
  sizes: { size: string; pieces: string }[];
  images: { imageData: Buffer; imageType: string }[];
}
