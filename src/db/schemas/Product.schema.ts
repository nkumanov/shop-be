import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EProductCategory, EProductSubCategory } from 'src/shared/models/products';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ collection: 'products' })
export class Product {
  @Prop({ default: '' })
  category: EProductCategory;
  @Prop({ default: '' })
  subCategory: EProductSubCategory;
  @Prop({ default: '' })
  title: string;
  @Prop({ default: '' })
  subTitle: string;
  @Prop({ default: '' })
  price: string;
  @Prop({ default: '' })
  description: string;
  @Prop({ default: [] })
  sizes: { size: string; pieces: string }[];
  @Prop({
    default: [],
  })
  images: string[]; // Array of images
}

export const ProductSchema = SchemaFactory.createForClass(Product);
