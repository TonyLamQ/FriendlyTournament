import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    GroupEditComponent,
    GroupListComponent,
    GroupDetailComponent,
  ],
})
export class UiGroupModule {}
