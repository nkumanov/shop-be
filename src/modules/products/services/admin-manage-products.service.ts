import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDocument } from 'src/db/schemas/Product.schema';
import { ProductsServiceDb } from 'src/db/services/product.service';
import { EProductCategory, IProduct } from 'src/shared/models/products';

@Injectable()
export class AdminManageProductsService {
  constructor(private readonly _productServiceDb: ProductsServiceDb) {}

  async createProductByAdmin(productData: IProduct): Promise<ProductDocument> {
    try {
      const newProduct = await this._productServiceDb.createProduct(productData);
      return newProduct.save();
    } catch (error) {
      console.log(error);
    }
  }
}
