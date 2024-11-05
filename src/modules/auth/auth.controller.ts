import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsGuestGuard } from 'src/guards/isGuest.guard';
import { IsUserGuard } from 'src/guards/isUser.guard';
import { AuthUserService } from './services/auth.service';
import { IUserCreateDto, IUserSignInDto } from 'src/shared/interfaces/user.';
import { JwtSvc } from 'src/shared/services/jwt.service';
import { ICustomHeaders } from 'src/shared/interfaces/custom-header';

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
  async loginUser(@Req() request: Request, @Res() response: Response, @Body() body: IUserSignInDto): Promise<void> {
    try {
      const existingUser = await this._authUserService.signIn(body);
      if (existingUser) {
        const token = await this._jwtService.createUserToken({
          email: existingUser.email,
          username: existingUser.username,
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
  @Delete('/profile/delete')
  @UseGuards(IsUserGuard)
  async deleteUserProfile(@Req() request: ICustomHeaders, @Res() response: Response): Promise<void> {
    try {
      const deletedUser = await this._authUserService.deleteUser(request.user.email);
      if (deletedUser) {
        response.send('User is deleted!');
      }
    } catch (error) {
      response.send(error);
    }
  }
}
