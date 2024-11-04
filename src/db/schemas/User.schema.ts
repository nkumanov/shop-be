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
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true, type: AddressSchema })
  address;
}

export const UserSchema = SchemaFactory.createForClass(User);
