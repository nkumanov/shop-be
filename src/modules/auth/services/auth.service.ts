import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/schemas/User.schema';
import { IUserInfo } from '../dto/user';
import * as bcrypt from 'bcrypt';
import { JwtSvc } from '../../../shared/services/jwt.service';
import { IUserCreateDto } from 'src/shared/interfaces/user.';
@Injectable()
export class AuthUserService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
    private readonly jwtService: JwtSvc,
  ) {}

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

  async createNewUser(userData: any): Promise<IUserInfo> {
    try {
      const newUser = new this._userModel(userData);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(userDataDto: IUserCreateDto): Promise<IUserInfo> {
    try {
      const checkIfExisting = await this._userModel.findOne({ email: userDataDto.email });
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
      return this.createNewUser(newUserToCreate);
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
