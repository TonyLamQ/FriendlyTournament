import { ITournament } from "@friendly-tournament/data/models";
import { Controller, Get, Post } from "@nestjs/common";
import { Body, Delete, Param, Put } from "@nestjs/common/decorators";
import { TournamentService } from "./tournament.service";

@Controller('Tournament')
export class TournamentController{
    constructor(private tournamentService: TournamentService){

    }

    @Get('findAll')
    async findAll() : Promise<ITournament[]>{
        return this.tournamentService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id:string) : Promise<ITournament>{
        return this.tournamentService.findById(id);
    }

    @Post('create')
    async create(@Body() tournament: Partial<ITournament>) : Promise<ITournament>{
        return this.tournamentService.create(tournament);
    }

    @Put('edit/:id')
    async update(@Param('id') id: string, @Body() changes: Partial<ITournament>) : Promise<ITournament>{
        return this.tournamentService.update(id, changes);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string) : Promise<ITournament>{
        return this.tournamentService.delete(id);
    }
}