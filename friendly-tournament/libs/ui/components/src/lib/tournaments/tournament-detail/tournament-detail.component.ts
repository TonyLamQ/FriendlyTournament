import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITournament } from '@friendly-tournament/data/models'
import { TournamentService } from '../tournament.service';

@Component({
  selector: 'friendly-tournament-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css'],
})
export class TournamentDetailComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  tournamentId: string | undefined;
  tournament$: Observable<ITournament> | undefined;

  constructor(
      private route: ActivatedRoute,
      private tournamentService: TournamentService,
      private router: Router,) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.tournamentId = params.get('id')!;
      console.log(`This is the tournament ID ${this.tournamentId}`)
      this.tournament$ = this.tournamentService.getTournament(this.tournamentId!);
    })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onDelete(): void {
    this.tournamentService.deleteTournament(this.tournamentId!).subscribe(()=> {
      this.router.navigate(['/tournaments'])
    });
  }

  onJoin(): void {
    this.tournamentService.joinTournament(this.tournamentId!).subscribe(()=> {
      this.router.navigate(['/tournaments'])
    });
  }
}
