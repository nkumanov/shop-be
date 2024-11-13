import { Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserServiceDb } from 'src/db/services/user.service';
import { IsUserGuard } from 'src/guards/isUser.guard';
import { ICustomRequest } from 'src/shared/models/custom-header';
import { ManageUserService } from '../services/user.service';

@Controller('/user/products')
export class UserProductsController {
  constructor(private readonly _userService: ManageUserService) {}
  @Get('/bookmarks')
  @UseGuards(IsUserGuard)
  async getUserBookmarks(@Req() req: ICustomRequest, @Res() res: Response): Promise<void> {
    try {
      const user = await this._userService.getUserBookmarks(req.user._id);
      if (user) {
        res.send(user.bookmarks);
      }
    } catch (error) {
      res.send(error);
    }
  }

  @Post('/bookmarks/:productId')
  @UseGuards(IsUserGuard)
  async addProductToUserBookmarks(
    @Req() req: ICustomRequest,
    @Res() res: Response,
    @Param() params: { productId: string },
  ): Promise<void> {
    try {
      const user = await this._userService.addProductToBookmark(req.user._id, params.productId);
      if (user) {
        res.send(user);
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  @Delete('/bookmarks/:productId')
  @UseGuards(IsUserGuard)
  deleteProductFromBookmarks(@Req() req: ICustomRequest, @Res() res: Response, @Param() params): void {
    console.log('this route is used to delete a product to user bookmarks');
    res.send();
  }

  @Get('/last-view')
  @UseGuards(IsUserGuard)
  userLastViewProducts(@Req() req: ICustomRequest, @Res() res: Response, @Param() params): void {
    console.log('this route is used to show the user last 5 viewed items');
    res.send();
  }
}
