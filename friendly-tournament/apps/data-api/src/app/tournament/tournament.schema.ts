import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { Punch, PunchSchema } from '../punch/punch.schema';
// import { User } from '../user/user.schema';
import * as mongoose from 'mongoose';
import { User, UserSchema } from '../user/user.schema';
import { Group } from '../group/group.schema';

export type TournamentDocument = HydratedDocument<Tournament>;

@Schema()
export class Tournament {
    @Prop({ type: String, required: true })
    Name: string;

    @Prop({ type: String, required: true })
    Game: string;

    @Prop({ type: Number, required: true })
    RewardPrize: number;

    @Prop({ type: Date, required: false })
    Date: Date;
    
    @Prop({ type: UserSchema, required: true })
    Creator: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], required: false })
    Groups: Group[];
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
