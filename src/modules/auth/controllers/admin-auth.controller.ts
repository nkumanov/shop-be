import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthAdminService } from '../services/auth-admin.service';
import { JwtSvc } from 'src/shared/services/jwt.service';
import { IsGuestGuard } from 'src/guards/isGuest.guard';
import { IAdminCreate, IAdminLogin } from 'src/shared/dto/user.dto.';
import { Response } from 'express';

@Controller('user/auth/admin')
export class AdminAuthController {
  constructor(
    private readonly _authAdminService: AuthAdminService,
    private readonly _jwtService: JwtSvc,
  ) {}
  @Post('/register')
  @UseGuards(IsGuestGuard)
  async registerAdmin(@Req() request: Request, @Res() response: Response, @Body() body: IAdminCreate): Promise<void> {
    try {
      const registeredUser = await this._authAdminService.registerAdmin(body);
      if (registeredUser) {
        const token = await this._jwtService.createAdminToken({
          email: registeredUser.email,
          username: registeredUser.username,
          admin: true,
          _id: registeredUser._id.toString(),
        });
        console.log(token);
        response.send({
          data: {
            token: token,
          },
        });
      }
    } catch (error) {
      console.log(error);
      response.send(error);
    }
  }
  @Post('/login')
  @UseGuards(IsGuestGuard)
  async loginAdmin(@Req() request: Request, @Res() response: Response, @Body() body: IAdminLogin): Promise<void> {
    try {
      const existingAdmin = await this._authAdminService.loginAdmin(body);
      if (existingAdmin) {
        const token = await this._jwtService.createAdminToken({
          email: existingAdmin.email,
          username: existingAdmin.username,
          admin: true,
          _id: existingAdmin._id.toString(),
        });
        response.send({
          data: {
            token: token,
          },
        });
      }
    } catch (error) {
      response.send(error);
    }
  }
}
