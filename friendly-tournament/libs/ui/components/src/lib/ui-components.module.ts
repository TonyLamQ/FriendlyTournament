import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UiGroupModule } from './groups/group.module';
import { UiTournamentModule } from './tournaments/tournament.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UiGroupModule,
    UiTournamentModule,
    LoginModule,
    ProfileModule
  ],
  declarations: [
  ],
})
export class UiComponentsModule {}
