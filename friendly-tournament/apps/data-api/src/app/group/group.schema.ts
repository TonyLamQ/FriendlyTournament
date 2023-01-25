import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { Punch, PunchSchema } from '../punch/punch.schema';
// import { User } from '../user/user.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
    @Prop({ type: String, required: true })
    Name: String;
}

export const GroupSchema = SchemaFactory.createForClass(Group);