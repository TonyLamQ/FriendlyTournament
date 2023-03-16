import { Component, OnInit } from "@angular/core";
import { IUser } from "@friendly-tournament/data/models";
import { Observable } from "rxjs";
import { UserService } from "../user.service";

@Component({
    selector: 'friendly-tournament-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css'],
  })
export class profileInfoComponent implements OnInit{
  token: string | null;
  user$: Observable<IUser> | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authJwtToken');
    
    this.user$ = this.userService.getProfile();
  }

}