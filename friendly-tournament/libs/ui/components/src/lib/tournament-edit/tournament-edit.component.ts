import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { ITournament } from '@friendly-tournament/data/models'
import { TournamentService } from '../../../../../../apps/data-api/src/app/tournament/tournament.service';

@Component({
  selector: 'friendly-tournament-tournament-edit',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.css'],
})
export class TournamentEditComponent implements OnInit, OnDestroy {
  subscriptionParams?: Subscription;
  tournament = new ITournament();
  tournament$: Observable<ITournament> | undefined;
  existingTournamentTitle$?: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService,
  ) {}

  ngOnInit(): void {

    // Haal de movie op voor edit
    this.subscriptionParams = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          // als we een nieuw item maken is er geen 'id'
          if (!params.get('id')) {
            // maak een lege movie
            // return of(this.movie);
            return of(this.tournament);
          } else {
            // haal de movie met gevraagde id via de api
            return this.tournamentService.getById(Number(params.get('id')));
          }
        }),
        tap(console.log)
      )
      .subscribe((tournament) => {
        // Spread operator om deep copy van movie te maken => op deze manier wordt
        // de movie niet geupdatet bij een "Cancel" of zonder dat een update() uitegevoerd wordt.
        this.tournament = { ...tournament };
      });
  }
  // Save movie via the service
  onSubmit(): void {
    console.log('onSubmit', this.tournament);
    // Update exiting movie
    if (this.tournament.id != 0) {
      this.tournamentService
        .update(this.tournament)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            throw 'error in source. Details: ' + error;
            // this.alertService.error(error.message);
            // return of(false);
          })
        )
        .subscribe((success: any) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    }
    // Create a new movie
    else {
      this.tournamentService
        .create(this.tournament)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            throw 'error in source. Details: ' + error;
            // this.alertService.error(error.message);
            // return of(false);
          })
        )
        .subscribe((success: any) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    }
  }
  ngOnDestroy(): void {
    this.subscriptionParams?.unsubscribe;
  }
}