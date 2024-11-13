import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../schemas/Admin.schema';

@Injectable()
export class AdminServiceDb {
  constructor(@InjectModel(Admin.name) private readonly _adminModel: Model<Admin>) {}
  async createAdmin(adminData: { email: string; username: string; password: string }): Promise<AdminDocument> {
    try {
      const newAdmin = new this._adminModel(adminData);
      return await newAdmin.save();
    } catch (error) {
      console.log(error);
    }
  }

  async getAdminByEmail(email: string): Promise<AdminDocument> {
    try {
      return await this._adminModel.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  }

  async getAdminByUsername(username: string): Promise<AdminDocument> {
    try {
      return await this._adminModel.findOne({ username });
    } catch (error) {
      console.log(error);
    }
  }
}
