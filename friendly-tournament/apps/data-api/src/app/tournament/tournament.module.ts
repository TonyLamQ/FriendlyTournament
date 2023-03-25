import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TournamentSchema } from "./tournament.schema";
import { TournamentController } from "./tournament.controller";
import { TournamentService } from "./tournament.service";
import { GroupSchema } from "../group/group.schema";
import { UserSchema } from "../user/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Tournament', schema: TournamentSchema },
      { name: 'Group', schema: GroupSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
  // exports: [TournamentService],
})
export class TournamentModule {
}