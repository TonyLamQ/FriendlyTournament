import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IInvitation, IInviteResponse, ITournament, IUser } from "@friendly-tournament/data/models";
import { isEmpty, map, Observable } from "rxjs";
import { GroupService } from "../../groups/group.service";
import { UserService } from "../user.service";
import { TournamentService } from "../../tournaments/tournament.service";

@Component({
  selector: 'friendly-tournament-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class profileInfoComponent implements OnInit {
  token: string | null;
  user$: Observable<IUser> | undefined;
  group: string | null;

  invites$ = new Observable<IInvitation[]>();
  invites: IInvitation[] = [];

  tournaments$: Observable<ITournament[]> | undefined;

  constructor(
     private userService: UserService, private groupService: GroupService,
     private router: Router,
     private tournamentService: TournamentService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authJwtToken');
    if (this.token) {
      this.user$ = this.userService.getProfile();
      this.user$.subscribe((x) => {
        if (x.CurrentGroup == null) {
          this.group = null;
        } else {
          if (x.CurrentGroup== null || x.CurrentGroup?.toString().length == 0) {
            this.group = null;
          } else {
            this.groupService.getGroup(x.CurrentGroup.toString()).subscribe((y) => {
              this.group = y.Name;
            }, (err) => {
              this.group = null;
            });
          }
        }
      });

      this.invites$ = this.userService.getInvites();

      this.tournaments$ = this.tournamentService.getRecommendedTournaments();
    } else {
      this.router.navigateByUrl('/about')
    }
  }

  onInviteResponse(response: boolean, invite: IInvitation) {
    console.log(invite)
    const value: Partial<IInviteResponse> = { response, _id: invite._id?.toString() };
      this.userService.inviteResponse(value).subscribe((x) => {
        alert("Invite Responded");
        this.invites$ = this.userService.getInvites();
      });
  }

  onLeaveGroup() {
    this.groupService.leaveGroup().subscribe((x) => {
      alert("Left Group");
      this.group = null;
    }, (err) => {
      alert("Error: " + err.error.message);
    });
  }
}