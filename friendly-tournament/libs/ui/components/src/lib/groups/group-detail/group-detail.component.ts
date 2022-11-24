import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IGroup } from '@friendly-tournament/data/models'
import { GroupService } from '../../../../../../../apps/data-api/src/app/group/group.service';

@Component({
  selector: 'friendly-tournament-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  groupId: number | undefined;
  group$: Observable<IGroup> | undefined;

  constructor(private route: ActivatedRoute, private groupService: GroupService) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.groupId = Number(params.get('id'));
      console.log(`This is the tournament ID ${this.groupId}`)
      this.group$ = this.groupService.getById(this.groupId);
    })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
