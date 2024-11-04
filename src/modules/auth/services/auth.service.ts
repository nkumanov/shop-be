import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/schemas/User.schema';
import { IUserInfo } from '../dto/user';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly _userModel: Model<User>) {}

  async getUserById(userId: string): Promise<IUserInfo> {
    try {
      const user = this._userModel.findById(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByUsername(username: string): Promise<IUserInfo> {
    try {
      const user = await this._userModel.findOne({ username });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createNewUser(userData: IUserInfo): Promise<IUserInfo> {
    try {
      const newUser = new this._userModel(userData);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(userData: IUserInfo): Promise<any> {
    try {
      const checkIfExisting = await this._userModel.findOne({ email: userData.email });
      if (checkIfExisting) {
        throw new Error('user already exist');
      }
      const passwordSalts = 10;
      const hashedPassword = await bcrypt.hash(userData.password, passwordSalts);
      userData.password = hashedPassword;
      const newRegisteredUser = await this.createNewUser(userData);
      return newRegisteredUser;
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(userData: { email: string; password: string }): Promise<IUserInfo> {
    try {
      const existingUser = await this._userModel.findOne({ email: userData.email });
      if (existingUser) {
        // check password here
        return existingUser;
      }
      throw new Error('Wrong email or password!');
    } catch (error) {
      console.log(error);
    }
  }
}
