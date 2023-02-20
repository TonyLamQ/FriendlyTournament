import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TournamentSchema } from "./tournament.schema";
import { TournamentController } from "./tournament.controller";
import { TournamentService } from "./tournament.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Tournament', schema: TournamentSchema }
    ]),
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
  // exports: [TournamentService],
})
export class TournamentModule {
}