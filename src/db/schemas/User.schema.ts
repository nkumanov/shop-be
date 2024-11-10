import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument, Types } from 'mongoose';
import { IProduct } from 'src/shared/models/products';

const AddressSchema = new mongoose.Schema({
  city: String,
  street: String,
  postalCode: String,
});

export type UserDocument = HydratedDocument<User>;
@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: '' })
  firstName: string;
  @Prop({ default: '' })
  lastName: string;
  @Prop({ default: '' })
  phone: string;
  @Prop({ type: AddressSchema, default: { city: '', street: '', postalCode: '' } })
  address;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Products' }], default: [] })
  bookmarks: (IProduct | Types.ObjectId)[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Products' }], default: [] })
  cart: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
