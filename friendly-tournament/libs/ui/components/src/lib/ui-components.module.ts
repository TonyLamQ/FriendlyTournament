import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentEditComponent } from './tournament-edit/tournament-edit.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TournamentEditComponent,
    TournamentListComponent,
  ],
})
export class UiComponentsModule {}
