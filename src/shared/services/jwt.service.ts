import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAdminData, IUserData } from '../models/users';

@Injectable()
export class JwtSvc {
  constructor(
    private readonly _jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async createUserToken(userData: IUserData): Promise<string> {
    try {
      return await this._jwt.signAsync(userData, { secret: this.configService.get('JWT_SECRET') });
    } catch (error) {
      return error;
    }
  }

  async decodeUserToken(token: string): Promise<IUserData> {
    try {
      return await this._jwt.verifyAsync(token, { secret: this.configService.get('JWT_SECRET') });
    } catch (error) {
      return error;
    }
  }

  async createAdminToken(userData: IAdminData): Promise<string> {
    try {
      return await this._jwt.signAsync(userData, { secret: this.configService.get('JWT_SECRET_ADMIN') });
    } catch (error) {
      return error;
    }
  }

  async decodeAdminToken(token: string): Promise<IAdminData> {
    try {
      return await this._jwt.verifyAsync(token, { secret: this.configService.get('JWT_SECRET_ADMIN') });
    } catch (error) {
      return error;
    }
  }
}
