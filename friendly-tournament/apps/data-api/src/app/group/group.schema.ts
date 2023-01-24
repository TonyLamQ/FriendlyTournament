import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { Punch, PunchSchema } from '../punch/punch.schema';
// import { User } from '../user/user.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
    @Prop({ type: Number, required: true })
    Name: string;

    @Prop({ type: Number, required: true })
    Game: String;

    @Prop({ type: Number, required: true })
    RewardPrize: Number;

    @Prop({ type: Number, required: false })
    resultCount: Number;

    @Prop({ type: Number, required: false })
    Date: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);