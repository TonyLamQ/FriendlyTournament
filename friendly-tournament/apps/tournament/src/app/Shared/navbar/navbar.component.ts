import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'friendly-tournament-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  key: string |null
  constructor(private router:Router) {
  }

  ngOnInit(): void {
      this.key = localStorage.getItem('authJwtToken');
  }

  logout(){
    localStorage.removeItem('authJwtToken');
    this.router.navigateByUrl('/login');
  }
}
