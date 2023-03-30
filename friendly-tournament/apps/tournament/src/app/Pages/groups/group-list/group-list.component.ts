import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IGroup, IUser } from '@friendly-tournament/data/models';
import { GroupService } from '../group.service';
import { UserService } from '../../profile/user.service';

@Component({
  selector: 'friendly-tournament-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groups: IGroup[] | undefined;
  groups$: Observable<IGroup[]> | undefined;
  token: string | null;

  group = new IGroup();
  group$: Observable<IGroup> | undefined;
  user$: Observable<IUser> | undefined;
  user: IUser | undefined;
  constructor(private groupService:GroupService, private userService: UserService ) {}

  ngOnInit(): void {
    this.groups$= this.groupService.getGroups();

    this.token = localStorage.getItem('authJwtToken');
    if (this.token) {
      this.user$ = this.userService.getProfile();
      this.user$.subscribe((x) => {
        this.user = x;
      });
    }
  }

  onDelete(groupId: string): void {
    this.groupService.deleteGroup(groupId).subscribe(()=> {
      window.location.reload();
    });
  }
}
