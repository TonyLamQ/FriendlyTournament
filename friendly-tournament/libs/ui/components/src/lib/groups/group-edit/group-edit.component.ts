import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { IGroup } from '@friendly-tournament/data/models'
import { GroupService } from '../group.service';
import { Location } from '@angular/common';
@Component({
  selector: 'friendly-tournament-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css'],
})
  export class GroupEditComponent implements OnInit, OnDestroy {
    subscriptionParams?: Subscription;
    group = new IGroup();
    groupId: string;
    // group$: Observable<IGroup> | undefined;
    existingGroupName$?: Observable<string>;
  
    constructor(
      // private route: ActivatedRoute,
      // private router: Router,
      // private groupService: GroupService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private groupService: GroupService,
    ) {}

    ngOnInit(): void {
      this.groupId = this.route.snapshot.paramMap.get("id")!;
      this.groupService.getGroup(this.groupId).subscribe(g => {
        this.group = g
      })
    }

    onSubmit(){

      if(this.groupId != null){
          this.groupService.updateGroup(this.group._id!, this.group).subscribe(()=> {
            this.location.back();
          },
          err=> {
            alert(err.error.message)
          });
  
      } else {
        this.group.CreatedDate = new Date();
        this.groupService.createGroup(this.group).subscribe(()=>{
          this.location.back();
        });
      }
    }

    ngOnDestroy(): void {
        
    }
  
    // ngOnInit(): void {
  
    //   // Haal de movie op voor edit
    //   this.subscriptionParams = this.route.paramMap
    //     .pipe(
    //       tap(console.log),
    //       switchMap((params: ParamMap) => {
    //         // als we een nieuw item maken is er geen 'id'
    //         if (!params.get('id')) {
    //           // maak een lege movie
    //           // return of(this.movie);
    //           return of(this.group);
    //         } else {
    //           // haal de movie met gevraagde id via de api
    //           return this.groupService.getById(Number(params.get('id')));
    //         }
    //       }),
    //       tap(console.log)
    //     )
    //     .subscribe((group) => {
    //       // Spread operator om deep copy van movie te maken => op deze manier wordt
    //       // de movie niet geupdatet bij een "Cancel" of zonder dat een update() uitegevoerd wordt.
    //       this.group = { ...group };
    //     });
    // }
    // // Save movie via the service
    // onSubmit(): void {
    //   console.log('onSubmit', this.group);
    //   // Update exiting movie
    //   if (this.group.id != 0) {
    //     this.groupService
    //       .update(this.group)
    //       .pipe(
    //         catchError((error: any) => {
    //           console.log(error);
    //           throw 'error in source. Details: ' + error;
    //           // this.alertService.error(error.message);
    //           // return of(false);
    //         })
    //       )
    //       .subscribe((success: any) => {
    //         console.log(success);
    //         if (success) {
    //           this.router.navigate(['..'], { relativeTo: this.route });
    //         }
    //       });
    //   }
    //   // Create a new movie
    //   else {
    //     this.group.CreatedDate= new Date();
    //     this.groupService
    //       .create(this.group)
    //       .pipe(
    //         catchError((error: any) => {
    //           console.log(error);
    //           throw 'error in source. Details: ' + error;
    //           // this.alertService.error(error.message);
    //           // return of(false);
    //         })
    //       )
    //       .subscribe((success: any) => {
    //         console.log(success);
    //         if (success) {
    //           this.router.navigate(['..'], { relativeTo: this.route });
    //         }
    //       });
    //   }
    // }
    // ngOnDestroy(): void {
    //   this.subscriptionParams?.unsubscribe;
    // }
  }

