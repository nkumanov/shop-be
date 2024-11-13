import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/db/schemas/Product.schema';
import { EProductCategory, EProductSubCategory, IProduct } from 'src/shared/models/products';

@Injectable()
export class ProductsServiceDb {
  constructor(@InjectModel(Product.name) private readonly _productModel: Model<Product>) {}

  async getProducts(gender: EProductCategory): Promise<ProductDocument[]> {
    try {
      const products = await this._productModel.find({ category: gender });
      return products;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductByCategory(category: EProductCategory): Promise<ProductDocument[]> {
    try {
      const products = await this._productModel.find({ category });
      return products;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductByCategoryAndSubcategory(
    category: EProductCategory,
    subCategory: EProductSubCategory,
  ): Promise<ProductDocument[]> {
    try {
      const products = await this._productModel.find({ category, subCategory });
      return products;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductById(productId: string): Promise<ProductDocument> {
    try {
      const product = await this._productModel.findById(productId);
      return product;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createProduct(productData: IProduct): Promise<ProductDocument> {
    try {
      const product = new this._productModel(productData);
      return await product.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
