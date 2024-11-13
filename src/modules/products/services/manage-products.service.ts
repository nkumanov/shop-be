import { Injectable } from '@nestjs/common';
import { ProductDocument } from 'src/db/schemas/Product.schema';
import { ProductsServiceDb } from 'src/db/services/product.service';
import { EProductCategory, EProductSubCategory, IProduct } from 'src/shared/models/products';

@Injectable()
export class ManageProductsService {
  constructor(private readonly _productServiceDb: ProductsServiceDb) {}

  async getAllProducts(productData: IProduct): Promise<any> {
    try {
      console.log('here');
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByCategory(category: EProductCategory): Promise<ProductDocument[]> {
    try {
      const products = this._productServiceDb.getProductByCategory(category);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByCategoryAndSubCategory(
    category: EProductCategory,
    subCategory: EProductSubCategory,
  ): Promise<any> {
    try {
      const products = this._productServiceDb.getProductByCategoryAndSubcategory(category, subCategory);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId: string): Promise<any> {
    try {
      console.log('here');
    } catch (error) {
      console.log(error);
    }
  }
}
