import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ICustomHeaders } from 'src/shared/interfaces/custom-header';
import { JwtSvc } from 'src/shared/services/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _jwtSvc: JwtSvc) {}
  async use(req: ICustomHeaders, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const decodedToken = await this._jwtSvc.decodeUserToken(req.headers['authorization']);
      if (decodedToken) {
        req.user = {
          email: decodedToken.email,
          username: decodedToken.username,
        };
      }
    }
    next();
  }
}
