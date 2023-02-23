import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ITournament } from '@friendly-tournament/data/models';
import { TournamentService } from '../tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'friendly-tournament-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css'],
})
export class TournamentListComponent implements OnInit {
  // tournaments: ITournament[];
  tournaments$: Observable<ITournament[]> | undefined;
  tournament$: Observable<ITournament> | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tournamentService: TournamentService,
    ) {}

  ngOnInit(): void {
    this.tournaments$= this.tournamentService.getTournaments();
  }

  onDelete(tournamentId: string): void {
    console.log(tournamentId)
    this.tournamentService.deleteTournament(tournamentId).subscribe(()=> {
      window.location.reload();
    });
  }
}
