import { Module } from '@nestjs/common';
import { UserServiceDb } from './services/user.service';
import { ManageProductsService } from './services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/Product.schema';
import { User, UserSchema } from './schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserServiceDb, ManageProductsService],
  exports: [
    UserServiceDb,
    ManageProductsService,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class DbModule {}
