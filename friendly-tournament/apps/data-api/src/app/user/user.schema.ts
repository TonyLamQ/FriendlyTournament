import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { isEmail } from 'class-validator';
import { Group, GroupSchema } from '../group/group.schema';
import { Invite, InviteSchema } from '../invite/invite.schema';

export type UserDocument = HydratedDocument<User>;

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

    @Prop({ required:false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invite'}]})
    GroupInvites: Invite[];

    @Prop({ required:false, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]})
    CurrentGroup: Group;

}

export const UserSchema = SchemaFactory.createForClass(User);