import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { GroupListComponent } from './Pages/group-list/group-list.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { TournamentListComponent } from './Pages/tournament-list/tournament-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GroupListComponent,
    MainLayoutComponent,
    TournamentListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
