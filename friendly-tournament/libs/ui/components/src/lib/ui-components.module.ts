import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentEditComponent } from './tournament-edit/tournament-edit.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    TournamentEditComponent,
    TournamentListComponent,
    TournamentDetailComponent,
  ],
})

export class UiComponentsModule {}
