import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],

})
export class LoginModule {
}
