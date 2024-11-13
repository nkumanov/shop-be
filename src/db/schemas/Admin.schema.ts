import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;
@Schema({ collection: 'admins' })
export class Admin {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
