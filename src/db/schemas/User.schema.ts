import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
  @Prop({ type: AddressSchema,  default: {} })
  address;
}

export const UserSchema = SchemaFactory.createForClass(User);
