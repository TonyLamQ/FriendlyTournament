import { Observable, of } from 'rxjs';
import { ITournament } from '@friendly-tournament/data/models';
import { Tournament, TournamentDocument } from './tournament.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TournamentService {
  constructor(@InjectModel('Tournament') private tournamentModel: Model<ITournament>) {

  }
  private tournament?: ITournament;
  private tournamentList: ITournament[] = [
    // {
    //   id: 1,
    //   Name: 'Champions',
    //   Game: 'Valorant',
    //   RewardPrice: 10.00,
    //   Date: new Date(2023,4,21),
    // },
    // {
    //   id: 2,
    //   Name: 'Repeat.gg',
    //   Game: 'Overwatch2',
    //   RewardPrice: 10.00,
    //   Date: new Date(2023,4,21),
    // },
    // {
    //   id: 3,
    //   Name: 'Battlefy',
    //   Game: 'CS:GO',
    //   RewardPrice: 10.00,
    //   Date: new Date(2023,4,21),
    // },
    // {
    //   id: 4,
    //   Name: 'Owayo',
    //   Game: 'Unturned',
    //   RewardPrice: 10.00,
    //   Date: new Date(2023,4,21),
    // },
    // {
    //   id: 5,
    //   Name: 'Community Gaming',
    //   Game: 'Minecraft',
    //   RewardPrice: 10.00,
    //   Date: new Date(2023,4,21),
    // },
  ];

  tournamentId: number = this.tournamentList.length;

  getList(): Observable<ITournament[]> {
    console.log('ITournament getList aangeroepen');
    console.log(this.tournamentList);
    return of(this.tournamentList);
  }

  async findAll(): Promise<ITournament[]> {
    return this.tournamentModel.find();
  }

  getById(id: number): Observable<ITournament> {
    console.log('ITournament getById aangeroepen');
    console.log(`ITournament met ID ${id} gezocht`);
    return of(this.tournamentList.filter((item) => item.id === id)[0]);
  }

  create(tournament: ITournament): Observable<any> {
    console.log('tournament create aangeroepen');
    this.tournament = { ...tournament };
    this.tournament.id = ++this.tournamentId;
    this.tournamentList.push(this.tournament);
    console.log(`Nieuwe tournament toegevoegd met ID ${this.tournamentId}`);
    return of({
      status: 201,
      message: 'success',
    });
  }

  update(tournament: ITournament): Observable<any> {
    console.log('tournament update aangeroepen');
    // TO DO: movieList updaten
    this.tournament = { ...tournament };
    this.tournamentList.splice(this.tournamentList.findIndex(t => t.id ===tournament.id),1, this.tournament)
        console.log(`tournament met ID ${this.tournament?.id} geüpdatet`);
        return of({
          status: 201,
          message: 'success',
        });
    } 

    delete(tournamentId: Number): Observable<any> {
      this.tournamentList.splice(this.tournamentList.findIndex(t => t.id ===tournamentId),1)
            console.log(`tournament met ID ${this.tournament?.id} deleted`);
            return of({
              status: 201,
              message: 'success',
            });
        } 
}