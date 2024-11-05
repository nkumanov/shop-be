import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsGuestGuard } from 'src/guards/isGuest.guard';
import { IsUserGuard } from 'src/guards/isUser.guard';
import { AuthUserService } from './services/auth.service';
import { IUserCreateDto } from 'src/shared/interfaces/user.';
import { JwtSvc } from 'src/shared/services/jwt.service';

@Controller('user/auth')
export class AuthController {
  constructor(
    private readonly _authUserService: AuthUserService,
    private readonly _jwtService: JwtSvc,
  ) {}
  @Get('/getUser')
  findUser(@Req() request: Request): void {}

  @Post('/signin')
  @UseGuards(IsGuestGuard)
  loginUser(@Req() request: Request, @Res() response: Response): void {
    response.send();
  }

  @Post('/signup')
  @UseGuards(IsGuestGuard)
  async registerNewUser(@Res() response: Response, @Body() body: IUserCreateDto): Promise<void> {
    try {
      const registeredUser = await this._authUserService.signUp(body);
      if (registeredUser) {
        const token = await this._jwtService.createUserToken({
          email: registeredUser.email,
          username: registeredUser.username,
        });
        response.send({
          data: {
            token: token,
          },
        });
      }
    } catch (err) {
      response.send(err);
    }

    response.send();
  }
  @Post('/profile/delete')
  @UseGuards(IsUserGuard)
  deleteUserProfile(@Req() request: Request, @Res() response: Response): void {
    response.send();
  }
}
