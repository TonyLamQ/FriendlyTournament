import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITournament } from '../../../../../libs/data/models/src/lib/ITournament';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournament?: ITournament;
  private tournamentList: ITournament[] = [
    {
      id: 1,
      Name: 'Champions',
      Game: 'Valorant',
      RewardPrice: 10.00,
      Date: new Date(),
    },
    {
        id: 2,
        Name: 'Test2',
        Game: 'Overwatch2',
        RewardPrice: 10.00,
        Date: new Date(),
    },
    {
        id: 3,
        Name: 'Test3',
        Game: 'Rocket League',
        RewardPrice: 10.00,
        Date: new Date(),
    },
  ];

  tournamentId: number = this.tournamentList.length;

  constructor() {}

  getList(): Observable<ITournament[]> {
    console.log('ITournament getList aangeroepen');
    console.log(this.tournamentList);
    return of(this.tournamentList);
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
        this.tournamentList.forEach(t => {
            if(this.tournament != null && t.id == this.tournament.id){
                this.tournamentList.splice(this.tournamentId-1, 1, this.tournament)
            }
        });
        console.log(`tournament met ID ${this.tournament?.id} geüpdatet`);
        return of({
          status: 201,
          message: 'success',
        });
    } 

    delete(tournamentId: Number): Observable<any> {
            this.tournamentList.forEach(t => {
                if(t.id == tournamentId){
                    this.tournamentList.splice(this.tournamentId-1, 1)
                } 
            });
            console.log(`tournament met ID ${this.tournament?.id} deleted`);
            return of({
              status: 201,
              message: 'success',
            });
        } 
}