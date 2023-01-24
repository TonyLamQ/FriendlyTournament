import { Controller } from "@nestjs/common";
import { TournamentService } from "./tournament.service";

@Controller('Tournament')
export class TournamentController{
    constructor(private tournamentService: TournamentService){

    }
}