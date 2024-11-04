import { Controller, Get, Header, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsUserGuard } from 'src/guards/isUser.guard';

@Controller('/products')
export class RetrieveProductsController {
  @Get('')
  getAllProducts(@Req() req: Request, @Res() res: Response): void {
    console.log('this route is used to retrieve all products no matter the gender');
    res.send();
  }

  @Get('/:gender')
  getAllProductsByGender(@Req() req: Request, @Res() res: Response, @Param() params): void {
    console.log('this route is used to retrieve all products by the gender');
    res.send();
  }

  @Get('/:gender/:category')
  getAllProductsByGenderAndCategory(@Req() req: Request, @Res() res: Response, @Param() params): void {
    console.log('this route is used to retrieve all products by the gender and category');
    res.send();
  }

  @Get('/user/bookmarks')
  @UseGuards(IsUserGuard)
  getUserBookmarks(@Req() req: Request, @Res() res: Response): void {
    console.log('this route is used to retrieve all products that the user added to bookmarks');
    res.send();
  }
  @Post('/user/bookmarks')
  @UseGuards(IsUserGuard)
  addProductToUserBookmarks(@Req() req: Request, @Res() res: Response): void {
    console.log('this route is used to retrieve all products that the user added to bookmarks');
    res.send();
  }
}
