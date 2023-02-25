import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { ITournament } from '@friendly-tournament/data/models'
import { TournamentService } from '../tournament.service';

@Component({
  selector: 'friendly-tournament-tournament-edit',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.css'],
})
export class TournamentEditComponent implements OnInit, OnDestroy {
  subscriptionParams?: Subscription;
  tournament = new ITournament();
  tournamentId: string | null;
  // tournament$: Observable<ITournament> | undefined;
  existingTournamentTitle$?: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tournamentService: TournamentService,
  ) {}

  ngOnInit(): void {
    this.tournamentId = this.route.snapshot.paramMap.get("id") || null;
    if(this.tournamentId){
      this.tournamentService.getTournament(this.tournamentId).subscribe(t => {
        this.tournament = t
      })
    }
  }

  onSubmit(){
    if(this.tournamentId != null){
      this.tournamentService.updateTournament(this.tournament._id!, this.tournament).subscribe(()=> {
        this.location.back();
      });

    } else {
      this.tournamentService.createTournament(this.tournament).subscribe(()=>{
        this.location.back();
      });
    }
  }

  ngOnDestroy(): void {
      
  }
}