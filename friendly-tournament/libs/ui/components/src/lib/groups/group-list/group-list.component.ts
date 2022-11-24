import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IGroup } from '@friendly-tournament/data/models';
import {GroupService} from '../../../../../../../apps/data-api/src/app/group/group.service';

@Component({
  selector: 'friendly-tournament-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groups: IGroup[] | undefined;
  groups$: Observable<IGroup[]> | undefined;

  group = new IGroup();
  group$: Observable<IGroup> | undefined;
  constructor(private groupService:GroupService ) {}

  ngOnInit(): void {
    this.groups$= this.groupService.getList();
  }

  onDelete(groupId: number): void {
    this.groupService.delete(groupId);
  }
}
