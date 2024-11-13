import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ManageProductsController } from './controllers/manage-products.controller';
import { AdminManageProductsController } from './controllers/admin-manage-products.controller';
import { AdminManageProductsService } from './services/admin-manage-products.service';
import { ManageProductsService } from './services/manage-products.service';

@Module({
  imports: [DbModule],
  controllers: [ManageProductsController, AdminManageProductsController],
  providers: [AdminManageProductsService, ManageProductsService],
})
export class ProductsModule {}
