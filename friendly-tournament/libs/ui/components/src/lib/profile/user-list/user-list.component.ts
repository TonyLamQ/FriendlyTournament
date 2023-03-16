import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '@friendly-tournament/data/models';
import { UserService } from '../user.service';

@Component({
  selector: 'friendly-tournament-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: IUser[] | undefined;
  users$: Observable<IUser[]> | undefined;

  user = new IUser();
  user$: Observable<IUser> | undefined;

  message = `you have been invited to join our group`;

  constructor(private userService:UserService ) {}

  ngOnInit(): void {
    this.users$= this.userService.getList();
  }

  onInvite(user: IUser) {
    this.userService.invite(user, this.message);
  }

}
