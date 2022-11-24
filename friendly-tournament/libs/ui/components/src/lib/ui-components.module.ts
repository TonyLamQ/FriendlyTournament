import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentEditComponent } from './tournament-edit/tournament-edit.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    TournamentEditComponent,
    TournamentListComponent,
    TournamentDetailComponent,
    GroupEditComponent,
    GroupListComponent,
    GroupDetailComponent,
  ],
})
export class UiComponentsModule {}
