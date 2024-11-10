import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { RetrieveProductsController } from './retrieve-products/retrieve-products.controller';

@Module({
  imports: [DbModule],
  controllers: [RetrieveProductsController],
  providers: [],
})
export class ProductsModule {}
