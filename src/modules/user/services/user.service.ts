import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/db/schemas/User.schema';
import { ProductsServiceDb } from 'src/db/services/product.service';
import { UserServiceDb } from 'src/db/services/user.service';

@Injectable()
export class ManageUserService {
  constructor(
    private readonly _userServiceDb: UserServiceDb,
    private readonly _productServiceDb: ProductsServiceDb,
  ) {}
  async addProductToBookmark(userId: string, productId: string): Promise<UserDocument> {
    try {
      const existingProduct = await this._productServiceDb.getProductById(productId);
      const existingUser = await this._userServiceDb.getUserById(userId);
      if (existingProduct && existingUser && !existingUser.bookmarks.includes(existingProduct._id)) {
        existingUser.bookmarks.push(existingProduct._id);
        return await existingUser.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserBookmarks(userId: string): Promise<UserDocument> {
    try {
      const existingUser = await this._userServiceDb.getUserById(userId);
      if (existingUser) {
        return existingUser;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
