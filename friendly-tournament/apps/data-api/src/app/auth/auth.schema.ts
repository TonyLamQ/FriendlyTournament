import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {

    @Prop({ required: true, unique: true,
        validate: {
          validator: (email: string) => isEmail(email),
          message: (email) => `${email.value} should be a valid email address`,
        }})
    Email: string;
    
    @Prop({ type: String, required: true })
    UserName: string;

    @Prop({type: String, required: true})
    hash:string;

    @Prop({type: String, required: false})
    token?:string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
