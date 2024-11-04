import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ICustomHeaders } from 'src/shared/interfaces/custom-header';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: ICustomHeaders, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      req.user = {
        email: '',
        username: '',
      };
    }
    next();
  }
}
