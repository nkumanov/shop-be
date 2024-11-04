import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsGuestGuard } from 'src/guards/isGuest.guard';
import { IsUserGuard } from 'src/guards/isUser.guard';
import { UserService } from './services/auth.service';

@Controller('user/auth')
export class AuthController {
  constructor(private readonly _userService: UserService) {}
  @Get('/getUser')
  findUser(@Req() request: Request): void {}

  @Post('/signin')
  @UseGuards(IsGuestGuard)
  loginUser(@Req() request: Request, @Res() response: Response): void {
    response.send();
  }

  @Post('/signup')
  @UseGuards(IsGuestGuard)
  async registerNewUser(@Req() request: Request, @Res() response: Response, @Body() body): Promise<void> {
    try {
      console.log(body)
    } catch (err) {
      console.log(err);
    }

    response.send();
  }
  @Post('/profile/delete')
  @UseGuards(IsUserGuard)
  deleteUserProfile(@Req() request: Request, @Res() response: Response): void {
    response.send();
  }
}
