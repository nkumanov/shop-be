import { Module } from '@nestjs/common';
import { RetrieveProductsController } from './retrieve-products/retrieve-products.controller';
import { UserProductsController } from './user-products/user-products.controller';

@Module({
  imports: [],
  controllers: [RetrieveProductsController, UserProductsController],
  providers: [],
})
export class ProductsModule {}
