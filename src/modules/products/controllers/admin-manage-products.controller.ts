import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductsServiceDb } from 'src/db/services/product.service';
import { IsUserAdminGuard } from 'src/guards/isAdmin.guard';
import { IProduct } from 'src/shared/models/products';
import { AdminManageProductsService } from '../services/admin-manage-products.service';

@Controller('products/admin')
export class AdminManageProductsController {
  constructor(private readonly _productService: AdminManageProductsService) {}
  @UseGuards(IsUserAdminGuard)
  @Post('/create-product')
  async createProduct(@Req() req: Request, @Res() res: Response, @Body() productData: IProduct): Promise<void> {
    try {
      const newProduct = await this._productService.createProductByAdmin(productData);
      res.send(newProduct);
    } catch (error) {
      console.log(error);
    }
  }
}
