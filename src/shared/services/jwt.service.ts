import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtSvc {
  constructor(
    private readonly _jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async createUserToken(userData: any): Promise<string> {
    return await this._jwt.signAsync(userData, { secret: this.configService.get('JWT_SECRET') });
  }

  async decodeUserToken(token: string): Promise<{ email: string; username: string }> {
    return await this._jwt.verifyAsync(token, { secret: this.configService.get('JWT_SECRET') });
  }
}
