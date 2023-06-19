import { ITournament } from "@friendly-tournament/data/models";
import { Controller, Get, Post } from "@nestjs/common";
import { Body, Delete, Headers, Param, Put, UseGuards } from "@nestjs/common/decorators";
import { AuthGuard } from "../auth/auth.guard";
import { TournamentService } from "./tournament.service";
import { Tournament } from "./tournament.schema";

@Controller('Tournament')
export class TournamentController{
    constructor(private tournamentService: TournamentService){

    }

    @Get('findAll')
    // @UseGuards(AuthGuard)
    async findAll() : Promise<ITournament[]>{
        return this.tournamentService.findAll();
    }

    @Get('recommended')
    async getRecommended(@Headers() header) : Promise<Tournament[]>{
        const userId = this.tournamentService.getIdFromHeader(header);
        return this.tournamentService.getRecommended(userId);
    }

    @Get(':id')
    async findById(@Param('id') id:string) : Promise<ITournament>{
        return this.tournamentService.findById(id);
    }

    @Post('create')
    async create(@Body() tournament: Partial<ITournament>, @Headers() header) : Promise<ITournament>{
        const userId = this.tournamentService.getIdFromHeader(header);
        return this.tournamentService.create(tournament, userId);
    }

    @Post('leave/:id')
    async leave(@Param('id') id:string, @Headers() header) : Promise<ITournament>{
        const userId = this.tournamentService.getIdFromHeader(header);
        return this.tournamentService.leave(id, userId);
    }

    @Post('join/:id')
    async join(@Param('id') id: string, @Headers() header) : Promise<ITournament>{
        const userId = this.tournamentService.getIdFromHeader(header);
        return this.tournamentService.join(id, userId);
    }

    @Put('edit/:id')
    async update(@Param('id') id: string, @Body() changes: Partial<ITournament>) : Promise<ITournament>{
        return this.tournamentService.update(id, changes);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string, @Headers() header) : Promise<ITournament>{
        const userId = this.tournamentService.getIdFromHeader(header);
        return this.tournamentService.delete(id, userId);
    }
}