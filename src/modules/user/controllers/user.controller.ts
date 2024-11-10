import { Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserServiceDb } from 'src/db/services/user.service';
import { IsUserGuard } from 'src/guards/isUser.guard';
import { ICustomRequest } from 'src/shared/models/custom-header';

@Controller('/user/products')
export class UserProductsController {
  constructor(private readonly _userService: UserServiceDb) {}
  @Get('/bookmarks')
  @UseGuards(IsUserGuard)
  async getUserBookmarks(@Req() req: ICustomRequest, @Res() res: Response): Promise<void> {
    try {
      const bookmarks = await this._userService.getUserBookmarks(req.user._id);
      res.send(bookmarks)
    } catch (error) {
      res.send(error);
    }
  }

  @Post('/bookmarks/:productId')
  @UseGuards(IsUserGuard)
  addProductToUserBookmarks(@Req() req: Request, @Res() res: Response, @Param() params): void {
    console.log('this route is used to add a product to user bookmarks');
    res.send();
  }

  @Delete('/bookmarks/:productId')
  @UseGuards(IsUserGuard)
  deleteProductFromBookmarks(@Req() req: Request, @Res() res: Response, @Param() params): void {
    console.log('this route is used to delete a product to user bookmarks');
    res.send();
  }

  @Get('/last-view')
  @UseGuards(IsUserGuard)
  userLastViewProducts(@Req() req: Request, @Res() res: Response, @Param() params): void {
    console.log('this route is used to show the user last 5 viewed items');
    res.send();
  }
}
