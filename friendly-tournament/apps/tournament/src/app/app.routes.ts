import { RouterModule, Route, Routes } from '@angular/router';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { TournamentEditComponent,
         TournamentListComponent,
         TournamentDetailComponent,
         GroupListComponent,
         GroupDetailComponent,
         GroupEditComponent, 
         LoginFormComponent} from '@friendly-tournament/ui/components';


import { NgModule } from '@angular/core';
import { AboutComponent } from './Pages/about/about.component';
import { RegisterFormComponent } from 'libs/ui/components/src/lib/login/register-form/register-form.component';
// import { UserComponent } from './objects/user/user.component';
// {path: 'userRoute', pathMatch:"full", component: UserComponent}

export const appRoutes: Route[] = [  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'about' },
      { path: 'tournaments', pathMatch: 'full', component: TournamentListComponent },
      { path: 'tournaments/new', pathMatch: 'full', component: TournamentEditComponent },
      { path: 'tournaments/:id', pathMatch: 'full', component: TournamentDetailComponent },
      { path: 'tournaments/:id/edit', pathMatch: 'full', component: TournamentEditComponent },

      { path: 'groups', pathMatch: 'full', component: GroupListComponent },
      { path: 'groups/new', pathMatch: 'full', component: GroupEditComponent },
      { path: 'groups/:id', pathMatch: 'full', component: GroupDetailComponent },
      { path: 'groups/:id/edit', pathMatch: 'full', component: GroupEditComponent },

      {path:"about", pathMatch:'full', component:AboutComponent},
      {path:"login", pathMatch:'full', component:LoginFormComponent},
      {path:"register", pathMatch:'full', component:RegisterFormComponent}
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

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
