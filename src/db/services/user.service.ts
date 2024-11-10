import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/db/schemas/User.schema';
import { IProduct } from 'src/shared/models/products';

@Injectable()
export class UserServiceDb {
  constructor(@InjectModel(User.name) private readonly _userModel: Model<User>) {}
  async getUserBookmarks(userId: string): Promise<IProduct[]> {
    try {
      const user = await this._userModel.findById(userId).populate('bookmarks').exec();
      console.log(user);
      return user.bookmarks as IProduct[];
    } catch (error) {
      return error;
    }
  }

  async getUserById(userId: string): Promise<UserDocument> {
    try {
      const user = this._userModel.findById(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    try {
      const user = await this._userModel.findOne({ username });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createNewUser(userData: any): Promise<UserDocument> {
    try {
      const newUser = new this._userModel(userData);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }
}