import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'friendly-tournament-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
  export class LoginFormComponent implements OnInit {

    form!:FormGroup
  
    constructor(
      private formBuilder:FormBuilder,
      private auth:AuthService,
      private router:Router,
      private location: Location
    ) {

    }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      })
    }

    login(){
        const values = this.form.value;
        this.auth.login(values.email, values.password)
        .subscribe(
          (reply:any)=> {

            localStorage.setItem("authJwtToken", reply.authJwtToken)

            this.location.back()
          },
          err => {
            console.log("Login Failed: ", err);
            alert('login Failed.');
          }
        );
    }

    get email(){
      return this.form.get('email')!;
    }
    get password(){
      return this.form.get('password')!;
    }
  }

