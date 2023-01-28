import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ITournament } from '@friendly-tournament/data/models';
import { TournamentService } from 'apps/data-api/src/app/tournament/tournament.service';

@Component({
  selector: 'friendly-tournament-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css'],
})
export class TournamentListComponent implements OnInit {
  tournaments: ITournament[] | undefined;
  tournaments$: Observable<ITournament[]> | undefined;

  tournament = new ITournament();
  tournament$: Observable<ITournament> | undefined;
  constructor(private tournamentService:TournamentService ) {}

  ngOnInit(): void {
    this.tournaments$= this.tournamentService.getList();
  }

  onDelete(tournamentId: number): void {
    this.tournamentService.delete(tournamentId);
  }
}
