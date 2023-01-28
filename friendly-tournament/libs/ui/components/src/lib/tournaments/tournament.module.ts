import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { TournamentEditComponent } from './tournament-edit/tournament-edit.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentService } from './tournament.service';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    TournamentDetailComponent,
    TournamentEditComponent,
    TournamentListComponent
  ],
  providers: [
    TournamentService
  ],
})
export class UiTournamentModule {}
