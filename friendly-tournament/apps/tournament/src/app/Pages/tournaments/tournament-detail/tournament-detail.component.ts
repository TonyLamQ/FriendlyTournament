import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { IGroup, ITournament, IUser } from '@friendly-tournament/data/models'
import { TournamentService } from '../tournament.service';
import { GroupService } from '../../groups/group.service';
import { UserService } from '../../profile/user.service';

@Component({
  selector: 'friendly-tournament-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css'],
})
export class TournamentDetailComponent implements OnInit, OnDestroy {
  token: string | null;
  subscription?: Subscription;
  
  tournamentId: string | undefined;
  tournament$: Observable<ITournament> | undefined;
  tournament: ITournament | undefined;
  creatorId: string | undefined;

  createdDate: string | undefined;

  groups$: IGroup[] = [];

  user$: Observable<IUser> | undefined;
  user: IUser | undefined;
  userId: string | undefined;

  constructor(
      private route: ActivatedRoute,
      private tournamentService: TournamentService,
      private groupService: GroupService,
      private userService: UserService,
      private router: Router,) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.tournamentId = params.get('id')!;
      console.log(`This is the tournament ID ${this.tournamentId}`)
      this.tournament$ = this.tournamentService.getTournament(this.tournamentId!);
      this.tournament$.subscribe((x) => {
        this.tournament = x;
        this.creatorId = x.Creator._id?.toString();

        const date = new Date(x.Date!);
        this.createdDate = date.toLocaleDateString();
        if(x.Groups != null){
          for (let i = 0; i < x.Groups.length; i++) {
            this.groupService.getGroup(x.Groups[i].toString()).subscribe((group) => {
              this.groups$.push(group);
            });
          }
        }
      });
    })

    this.token = localStorage.getItem('authJwtToken');
    if (this.token) {
      this.user$ = this.userService.getProfile();
      this.user$.subscribe((x) => {
        this.user = x;
        this.userId = x._id?.toString();
      });
    }
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
      alert('You have joined the tournament')
      this.router.navigate(['/tournaments'])
    }, (err) => {
      alert(err.error.message)
    });
  }

  onLeave(): void {
    this.tournamentService.leaveTournament(this.tournamentId!).subscribe(()=> {
      alert('You have left the tournament')
      this.router.navigate(['/tournaments'])
    }, (err) => {
      alert(err.error.message)
    });
  }
}
