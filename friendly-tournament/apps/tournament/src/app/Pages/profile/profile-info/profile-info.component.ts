import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  invites$ = new Observable<IInvitation[]>();
  invites: IInvitation[] = [];

  constructor(private userService: UserService, private groupService: GroupService, private router: Router) {
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

      this.invites$ = this.userService.getInvites();
    } else {
      this.router.navigateByUrl('/about')
    }
  }

  onInviteResponse(response: boolean, invite: IInvitation) {
    console.log(invite)
    const value: Partial<IInviteResponse> = { response, _id: invite._id?.toString() };
      this.userService.inviteResponse(value).subscribe((x) => {
        alert("Invite Responded");
        this.router.navigateByUrl('/about')
      });
  }

  onLeaveGroup() {
    this.userService.leaveGroup().subscribe((x) => {
      alert("Left Group");
      this.router.navigateByUrl('/about')
    });
  }
}