import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ICustomRequest } from 'src/shared/models/custom-header';
import { JwtSvc } from 'src/shared/services/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _jwtSvc: JwtSvc) {}
  async use(req: ICustomRequest, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const decodedToken = await this._jwtSvc.decodeUserToken(req.headers['authorization']);
      if (decodedToken.email) {
        req.user = {
          email: decodedToken.email,
          username: decodedToken.username,
          _id: decodedToken._id,
        };
      }
    } else if (req.headers['admin-authorization']) {
      const decodedToken = await this._jwtSvc.decodeAdminToken(req.headers['admin-authorization']);
      if (decodedToken.email) {
        req.admin = {
          email: decodedToken.email,
          username: decodedToken.username,
          admin: true,
          _id: decodedToken._id,
        };
      }
    }
    next();
  }
}
