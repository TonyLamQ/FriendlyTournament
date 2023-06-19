import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IInvitation, IUser } from '@friendly-tournament/data/models';
import { UserService } from '../user.service';

@Component({
  selector: 'friendly-tournament-friend-list',
  templateUrl: './friend-list.component.html'
})
export class FriendListComponent implements OnInit {
  users: IUser[] | undefined;
  users$: Observable<IUser[]> | undefined;

  user = new IUser();
  user$: Observable<IUser> | undefined;

  message = `you have been invited to join our group`;

  constructor(private userService:UserService ) {}

  ngOnInit(): void {
    this.users$= this.userService.getFriends();
    // this.users$.subscribe((user) => {
    //   console.log(user)
    // })
  }

  onUnfriend(user: IUser) {
    this.userService.unfriend(user).subscribe((x)=>{
      alert("Unfriended: " + user.UserName)
      this.users$ = this.userService.getFriends();
    }, err => {
      alert("Unfriend failed: " + err.error.message)
    })
  }

}
