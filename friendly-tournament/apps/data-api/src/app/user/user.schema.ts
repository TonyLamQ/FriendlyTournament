import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { isEmail } from 'class-validator';

export type AuthDocument = HydratedDocument<User>;

@Schema()
export class User{

    @Prop({ required: true, unique: true,
        validate: {
          validator: (email: string) => isEmail(email),
          message: (email) => `${email.value} should be a valid email address`,
        }})
    Email: string;

    @Prop({ type: String, required: true, unique: true })
    UserName: string;

    @Prop({ type: Boolean, required: true, default:false })
    HasAGroup: Boolean;

    @Prop({ type: Date, required: true })
    BirthDate: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);