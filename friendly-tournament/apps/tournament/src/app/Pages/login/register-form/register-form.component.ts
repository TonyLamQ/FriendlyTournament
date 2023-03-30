import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@friendly-tournament/data/models';
import { AuthService } from '../auth.service';
import * as moment from 'moment';
@Component({
  selector: 'friendly-tournament-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
  export class RegisterFormComponent implements OnInit {

    form!:FormGroup
    token:string | null
  
    constructor(
      private formBuilder:FormBuilder,
      private auth:AuthService,
      private router:Router,
      private location: Location
    ) {

    }

    ngOnInit(): void {
      this.token = localStorage.getItem('authJwtToken');
      if(this.token){
        this.router.navigateByUrl('/about')
      }
      this.form = this.formBuilder.group({
        Email: new FormControl('', [Validators.required, Validators.email]),
        UserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        hash: new FormControl('', [Validators.required, Validators.minLength(6)]),
        BirthDate: new FormControl('', [Validators.required, this.dateValidator]),
      })
    }

    dateValidator(control: FormControl): ValidationErrors | null {
      if (control.value) {
        const date = moment(control.value);
        const today = moment();
        if (today.isBefore(date)) {
          console.log('invalid date')
          return { 'invalidDate': true }
        }
      }
      return null;
    }

    register(){
      const values = this.form.value;
      this.auth.register(values)
      .subscribe(
        (user:IUser | undefined)=> {
          if(user){
            console.log('user = ', user)
            this.router.navigate(['/login'])
          }
        },
        err => {
          console.log("registered Failed: ", err);
          alert('registered Failed.');
        }
      );
    }

    get email(){
      return this.form.get('Email')!;
    }
    get hash(){
      return this.form.get('hash')!;
    }

    get username(){
      return this.form.get('UserName')!;
    }
  
    get birthdate(){
      return this.form.get('BirthDate')!;
    }
  }

