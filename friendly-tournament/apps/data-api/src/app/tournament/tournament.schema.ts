import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { Punch, PunchSchema } from '../punch/punch.schema';
// import { User } from '../user/user.schema';
import * as mongoose from 'mongoose';

export type TournamentDocument = HydratedDocument<Tournament>;

@Schema()
export class Tournament {
    @Prop({ type: String, required: true })
    Name: string;

    @Prop({ type: String, required: true })
    Game: string;

    @Prop({ type: Number, required: true })
    RewardPrize: Number;

    @Prop({ type: Date, required: false })
    Date: Date;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
