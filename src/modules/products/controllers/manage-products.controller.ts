import { Controller, Get, Header, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsUserGuard } from 'src/guards/isUser.guard';
import { ManageProductsService } from '../services/manage-products.service';
import { EProductCategory, EProductSubCategory } from 'src/shared/models/products';

@Controller('/products')
export class ManageProductsController {
  constructor(private readonly _manageProductsSvc: ManageProductsService) {}
  @Get('')
  getAllProducts(@Req() req: Request, @Res() res: Response): void {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  @Get('/:category')
  async getAllProductsByGender(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: { category: EProductCategory },
  ): Promise<void> {
    try {
      const products = await this._manageProductsSvc.getProductsByCategory(params.category);
      res.send({
        data: {
          products,
        },
      });
    } catch (error) {
      res.send(error);
    }
  }

  @Get('/:category/:subCategory')
  async getAllProductsByGenderAndCategory(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: { category: EProductCategory; subCategory: EProductSubCategory },
  ): Promise<void> {
    try {
      const products = await this._manageProductsSvc.getProductsByCategoryAndSubCategory(
        params.category,
        params.subCategory,
      );
      res.send({
        data: {
          products,
        },
      });
    } catch (error) {
      res.send(error);
    }
  }
}
