import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Group, GroupSchema } from '../group/group.schema';
import { User, UserSchema } from '../user/user.schema';


export type InviteDocument = HydratedDocument<Invite>;

@Schema()
export class Invite {

    @Prop({ type: Date, required: true })
    sendDate: Date;

    @Prop({ required: false, type:String})
    Message: string;

    @Prop({required:true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    User: User;

    @Prop({ required: false, type:GroupSchema})
    Group: Group;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);