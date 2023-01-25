import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { Punch, PunchSchema } from '../punch/punch.schema';
// import { User } from '../user/user.schema';

export type TournamentDocument = HydratedDocument<Tournament>;

@Schema()
export class Tournament {
    @Prop({ type: String, required: true })
    Name: string;

    @Prop({ type: String, required: true })
    Game: string;

    @Prop({ type: Number, required: true })
    RewardPrize: Number;

    @Prop({ type: Number, required: false })
    resultCount: Number;

    @Prop({ type: Date, required: false })
    Date: Date;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);

// export const TournamentSchema = new mongoose.Schema({
//     Name: { type: String, required: true },
//     Game: { type: String, required: true },
//     RewardPrize: { type: Number, required: true },
//     resultCount: { type: Number, required: false },
//     Date: { type: Date, required: false },
// });