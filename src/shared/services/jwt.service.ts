import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUserData } from '../models/users';

@Injectable()
export class JwtSvc {
  constructor(
    private readonly _jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async createUserToken(userData: IUserData): Promise<string> {
    return await this._jwt.signAsync(userData, { secret: this.configService.get('JWT_SECRET') });
  }

  async decodeUserToken(token: string): Promise<IUserData> {
    return await this._jwt.verifyAsync(token, { secret: this.configService.get('JWT_SECRET') });
  }
}
