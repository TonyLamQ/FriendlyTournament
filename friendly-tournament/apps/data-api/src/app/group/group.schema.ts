import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { Punch, PunchSchema } from '../punch/punch.schema';
// import { User } from '../user/user.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
    @Prop({ type: String, required: true })
    Name: String;

    @Prop({ type: Number, required: false })
    TotalPlayers: Number;

    @Prop({ type: Date, required: true })
    CreatedDate: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);