import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ITournament, IUser } from '@friendly-tournament/data/models';
import { TournamentService } from '../tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../profile/user.service';

@Component({
  selector: 'friendly-tournament-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css'],
})
export class TournamentListComponent implements OnInit {
  // tournaments: ITournament[];
  tournaments$: Observable<ITournament[]> | undefined;
  tournament$: Observable<ITournament> | undefined;
  token: string | null;
  user$: Observable<IUser> | undefined;
  user: IUser | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tournamentService: TournamentService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.tournaments$= this.tournamentService.getTournaments();

    this.token = localStorage.getItem('authJwtToken');
    if (this.token) {
      this.user$ = this.userService.getProfile();
      this.user$.subscribe((x) => {
        this.user = x;
      });
    }
  }

  onDelete(tournamentId: string): void {
    this.tournamentService.deleteTournament(tournamentId).subscribe(()=> {
      this.router.navigate(['/tournaments'])
    });
  }

}
