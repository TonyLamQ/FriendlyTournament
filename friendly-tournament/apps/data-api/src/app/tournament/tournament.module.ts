import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TournamentSchema, Tournament } from "./tournament.schema";
import { TournamentController } from "./tournament.controller";
import { TournamentService } from "./tournament.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tournament.name, schema: TournamentSchema }
    ]),
  ],
  controllers: [TournamentController],
  providers: [TournamentService]
})
export class WorkoutModule {
}