import { Component, OnInit } from "@angular/core";
import { IInvitation, IUser } from "@friendly-tournament/data/models";
import { map, Observable } from "rxjs";
import { UserService } from "../user.service";

@Component({
    selector: 'friendly-tournament-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css'],
  })
export class profileInfoComponent implements OnInit{
  token: string | null;
  user$: Observable<IUser> | undefined;

  invite$ = new Observable<IInvitation>();
  invites$ = new Observable<IInvitation[]>();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authJwtToken');
    if(this.token) {
      this.user$ = this.userService.getProfile();
      this.invites$ = this.user$.pipe(map(user => user.GroupInvites));
    }
  } 

}