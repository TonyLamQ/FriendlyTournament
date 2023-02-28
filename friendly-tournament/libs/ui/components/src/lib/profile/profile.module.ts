import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { profileInfoComponent } from './profile-info/profile-info.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [
    profileInfoComponent
  ],

})
export class ProfileModule {
}
