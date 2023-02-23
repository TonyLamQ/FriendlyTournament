import { IEntry, ITournament } from '@friendly-tournament/data/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Tournament, TournamentSchema } from '../tournament/tournament.schema';
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

    @Prop({ required: false, type:[{type:Types.ObjectId, ref:'Tournament'},{Price:Number, EnrollmentDate:Date}]})
    Entries: IEntry[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);