import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IGroup, IUser } from '@friendly-tournament/data/models'
import { GroupService } from '../group.service';
import { UserService } from '../../profile/user.service';

@Component({
  selector: 'friendly-tournament-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  groupId: string;
  group$: Observable<IGroup> | undefined;
  group: IGroup | undefined;
  createdDate: string;
  token: string | null

  user$: Observable<IUser> | undefined;
  user: IUser | undefined;
  constructor(private route: ActivatedRoute, private groupService: GroupService, private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('authJwtToken');
    this.token = localStorage.getItem('authJwtToken');
    if (this.token) {
      this.user$ = this.userService.getProfile();
      this.user$.subscribe((x) => {
        this.user = x;
      });
    }

    this.subscription = this.route.paramMap.subscribe((params) => {
      this.groupId = params.get('id')!.toString();
      console.log(`This is the tournament ID ${this.groupId}`)
      this.group$ = this.groupService.getGroup(this.groupId);
      this.group$.subscribe((group) => {
        const date = new Date(group.CreatedDate!);
        this.createdDate = date.toLocaleDateString();
        this.group = group;
      });
    })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onDelete(): void {
    this.groupService.deleteGroup(this.groupId).subscribe(()=> {
      this.router.navigate(['/groups'])
    });
  }
}
