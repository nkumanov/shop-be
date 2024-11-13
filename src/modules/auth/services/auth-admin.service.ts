import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { AdminDocument } from 'src/db/schemas/Admin.schema';

import { AdminServiceDb } from 'src/db/services/admin.service';
import { IAdminCreate } from 'src/shared/dto/user.dto.';
@Injectable()
export class AuthAdminService {
  constructor(private readonly _adminServiceDb: AdminServiceDb) {}

  async registerAdmin(adminData: IAdminCreate): Promise<AdminDocument> {
    try {
      const checkIfExisting = await this._adminServiceDb.getAdminByEmail(adminData.email);
      if (checkIfExisting) {
        throw new BadRequestException('This email already exists!');
      }
      if (adminData.password !== adminData.confirmPassword) {
        throw new BadRequestException('Passwords do not match!');
      }
      delete adminData.confirmPassword;
      const newUserToCreate = {
        ...adminData,
      };
      const passwordSalts = 10;
      const hashedPassword = await bcrypt.hash(adminData.password, passwordSalts);
      newUserToCreate.password = hashedPassword;
      return this._adminServiceDb.createAdmin(newUserToCreate);
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

  async loginAdmin(adminData: { email: string; password: string; username: string }): Promise<AdminDocument> {
    try {
      const existingAdmin = await this._adminServiceDb.getAdminByEmail(adminData.email);
      if (existingAdmin) {
        // check password here
        const passowrdMatch = await bcrypt.compare(adminData.password, existingAdmin.password);
        const usernameMatch = existingAdmin.username === adminData.username;
        if (passowrdMatch && usernameMatch) {
          return existingAdmin;
        }
      }
      throw new BadRequestException('Wrong email, password or username!');
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
