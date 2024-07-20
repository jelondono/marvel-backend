import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AddFavoriteDto } from 'src/interfaces/dto/add-favorite.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ type: [{ type: Object }] })
  favorites: AddFavoriteDto[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
