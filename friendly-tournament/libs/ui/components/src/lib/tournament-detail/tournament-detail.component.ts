import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITournament } from '@friendly-tournament/data/models'
import { TournamentService } from '../../../../../../apps/data-api/src/app/tournament/tournament.service';
@Component({
  selector: 'friendly-tournament-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css'],
})
export class TournamentDetailComponent implements OnInit {
  subscription?: Subscription;
  tournamentId: number | undefined;
  tournament$: Observable<ITournament> | undefined;

  constructor(private route: ActivatedRoute, private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.tournamentId = Number(params.get('id'));
      console.log(`This is the tournament ID ${this.tournamentId}`)
      this.tournament$ = this.tournamentService.getById(this.tournamentId);
    })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
