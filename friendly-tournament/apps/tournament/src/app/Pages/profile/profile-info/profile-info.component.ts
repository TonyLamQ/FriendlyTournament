import { Component, OnInit } from "@angular/core";
import { IGroup, IInvitation, IInviteResponse, IUser } from "@friendly-tournament/data/models";
import { isEmpty, map, Observable } from "rxjs";
import { GroupService } from "../../groups/group.service";
import { UserService } from "../user.service";

@Component({
  selector: 'friendly-tournament-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class profileInfoComponent implements OnInit {
  token: string | null;
  user$: Observable<IUser> | undefined;
  group: string | null;
  invite$ = new Observable<IInvitation>();
  invites$ = new Observable<IInvitation[]>();

  constructor(private userService: UserService, private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authJwtToken');
    if (this.token) {
      this.user$ = this.userService.getProfile();
      this.user$.subscribe((x) => {
        if (x.CurrentGroup == null) {
          this.group = null;
        } else {
          if (x.CurrentGroup?.toString().length == 0) {
            this.group = null;
          };
          this.groupService.getGroup(x.CurrentGroup.toString()).subscribe((y) => {
            this.group = y.Name;
          });
        }
      });

      this.invites$ = this.user$.pipe(map(user => user.GroupInvites));

    }
  }

  onInviteResponse(response: boolean, invite: IInvitation) {
    const value: Partial<IInviteResponse> = { response, _id: invite.toString() };
    this.userService.inviteResponse(value).subscribe((x) => {
      window.location.reload();
    });
  }

  onLeaveGroup() {
    this.userService.leaveGroup().subscribe((x) => {
      window.location.reload();
    });
  }
}