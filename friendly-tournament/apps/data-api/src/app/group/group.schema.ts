import { IEntry, ITournament } from '@friendly-tournament/data/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User, UserSchema } from '../user/user.schema';
// import { Punch, PunchSchema } from '../punch/punch.schema';
// import { User } from '../user/user.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
    @Prop({ type: String, required: true })
    Name: String;

    @Prop({ type: Date, required: true })
    CreatedDate: Date;

    @Prop({ required: false, type:[{type:Types.ObjectId, ref:'Tournament'},{Price:Number, EnrollmentDate:Date}]})
    Entries: IEntry[];

    @Prop({ type: {
        User: {type:Types.ObjectId, ref:'User'},
        Group: {type:Types.ObjectId, ref:'Group'},
        Message: String,
        sendDate: Date
    }})
    Invites:{
        User: User,
        Group: Group,
        Message: String,
        sendDate: Date
    }

    @Prop({ required: false, type:[{type:UserSchema}]})
    Users: User[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);