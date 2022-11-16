import { Route } from '@angular/router';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { TournamentListComponent } from './Pages/tournament-list/tournament-list.component';
// import { UserComponent } from './objects/user/user.component';
// {path: 'userRoute', pathMatch:"full", component: UserComponent}
export const appRoutes: Route[] = [  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'friendly-tournament-tournament-list' },
      { path: 'friendly-tournament-tournament-list', pathMatch: 'full', component: TournamentListComponent },
    //   { path: 'about', pathMatch: 'full', component: AboutComponent },
    //   {
    //     path: 'users',
    //     loadChildren: () =>
    //       import(/* webpackChunkName: "user.module" */ '@cswp/feature').then(
    //         (m) => m.UserModule,
    //         () => {
    //           throw { loadChunkError: true }
    //         }
    //       )
    //   },
    //   {
    //     path: 'meals',
    //     loadChildren: () =>
    //       import(/* webpackChunkName: "meal.module" */ '@cswp/feature').then(
    //         (m) => m.MealModule,
    //         () => {
    //           throw { loadChunkError: true }
    //         }
    //       )
    //   }
    ]
  },
//   { path: 'login', pathMatch: 'full', component: LoginComponent },
//   { path: 'register', pathMatch: 'full', component: RegisterComponent },
//   { path: '**', pathMatch: 'full', redirectTo: 'dashboard' } 
];
