import { Controller, Delete, Get, Header, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsUserGuard } from 'src/guards/isUser.guard';

@Controller('/user/products')
export class UserProductsController {
  @Get('/bookmarks')
  @UseGuards(IsUserGuard)
  getUserBookmarks(@Req() req: Request, @Res() res: Response): void {
    console.log('this route is used to retrieve all products that the user added to bookmarks');
    res.send();
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
