import { Module } from '@nestjs/common';
import { UserServiceDb } from './services/user.service';
import { ProductsServiceDb } from './services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/Product.schema';
import { User, UserSchema } from './schemas/User.schema';
import { Admin, AdminSchema } from './schemas/Admin.schema';
import { AdminServiceDb } from './services/admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [UserServiceDb, ProductsServiceDb, AdminServiceDb],
  exports: [UserServiceDb, ProductsServiceDb, AdminServiceDb],
})
export class DbModule {}
