import { Observable, of } from 'rxjs';
import { ITournament } from '@friendly-tournament/data/models';
import { Tournament, TournamentDocument } from './tournament.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TournamentService {
  constructor(@InjectModel('Tournament') private tournamentModel: Model<Tournament>) {
  }

    async findAll(): Promise<ITournament[]> {
      return this.tournamentModel.find();
    }

    async findById(id: string): Promise<ITournament> {
      const tournament = await this.tournamentModel.findById(id);
      return tournament.toObject({versionKey: false});
    }

    async create(tournamentModel: Partial<ITournament>) : Promise<ITournament> {
      const newTournament = new this.tournamentModel(tournamentModel);
      await newTournament.save();
      return newTournament.toObject({versionKey: false});
    }

    async update(id: string, changes: Partial<ITournament>) : Promise<ITournament> {
      const tournament = await this.tournamentModel.findById(id);
      if (tournament) {
        tournament.set(changes);
        await tournament.save();
        return tournament.toObject({versionKey: false});
      }
      throw new NotFoundException(`Tournament with ${id} not found`);
    }

    async delete(id: string) : Promise<ITournament> {
      const tournament = await this.tournamentModel.findById(id);
      if (tournament) {
        await tournament.remove();
        return tournament.toObject({versionKey: false});
      }
      throw new NotFoundException(`Tournament with ${id} not found`);
    }
}