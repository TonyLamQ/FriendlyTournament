import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'apps/data-api/src/app/auth/auth.service'
@Component({
  selector: 'friendly-tournament-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
  export class LoginFormComponent implements OnInit, OnDestroy {

    form:FormGroup
  
    constructor(
      private fb:FormBuilder,
      private auth:AuthService,
      private router:Router,
    ) {
      this.form = fb.group({
        email: ['gebruiker@email.com', [Validators.required]],
        password: ['test', [Validators.required]]
      })
    }

    ngOnInit(): void {
        
    }
    onSubmit(){

    }

    ngOnDestroy(): void {
        
    }
  }

