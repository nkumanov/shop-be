import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserDocument } from 'src/db/schemas/User.schema';
import { UserServiceDb } from 'src/db/services/user.service';
import { IUserCreateDto } from 'src/shared/dto/user.dto.';
@Injectable()
export class AuthUserService {
  constructor(private readonly _userServiceDb: UserServiceDb) {}

  async signUp(userDataDto: IUserCreateDto): Promise<UserDocument> {
    try {
      const checkIfExisting = await this._userServiceDb.getUserByEmail(userDataDto.email);
      if (checkIfExisting) {
        throw new BadRequestException('This email already exists!');
      }
      if (userDataDto.password !== userDataDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match!');
      }
      delete userDataDto.confirmPassword;
      const newUserToCreate = {
        ...userDataDto,
      };
      const passwordSalts = 10;
      const hashedPassword = await bcrypt.hash(userDataDto.password, passwordSalts);
      newUserToCreate.password = hashedPassword;
      return this._userServiceDb.createNewUser(newUserToCreate);
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

  async signIn(userData: { email: string; password: string }): Promise<UserDocument> {
    try {
      const existingUser = await this._userServiceDb.getUserByEmail(userData.email);
      if (existingUser) {
        // check password here
        const passowrdMatch = await bcrypt.compare(userData.password, existingUser.password);
        if (passowrdMatch) {
          return existingUser;
        }
      }
      throw new BadRequestException('Wrong email or password!');
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

  async deleteUser(email: string): Promise<UserDocument> {
    try {
      const existingUser = await this._userServiceDb.getUserByEmail(email);
      if (existingUser) {
        const deleted = await this._userServiceDb.findUserByIdAndDelete(existingUser._id.toString());
        return deleted;
      }
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
