import { IEntry, ITournament } from '@friendly-tournament/data/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Group, GroupSchema } from '../group/group.schema';
import { User, UserSchema } from '../user/user.schema';

export type InviteDocument = HydratedDocument<Invite>;

@Schema()
export class Invite {
    @Prop({ type: UserSchema, required: true })
    User: User;

    @Prop({ type: GroupSchema, required: true })
    Group: Group;

    @Prop({ type: Date, required: true })
    sendDate: Date;

    @Prop({ required: false, type:String})
    Message: string;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);