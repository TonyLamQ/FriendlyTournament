import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UiGroupModule } from './groups/group.module';
import { UiTournamentModule } from './tournaments/tournament.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // UiGroupModule,
    UiTournamentModule
  ],
  declarations: [
  ],
})
export class UiComponentsModule {}
