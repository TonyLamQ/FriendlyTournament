import { ITournament } from "@friendly-tournament/data/models";
import { Controller, Get } from "@nestjs/common";
import { TournamentService } from "./tournament.service";

@Controller('Tournament')
export class TournamentController{
    constructor(private tournamentService: TournamentService){

    }

    @Get('findAll')
    async findAll() : Promise<ITournament[]>{
        return this.tournamentService.findAll();
    }
}