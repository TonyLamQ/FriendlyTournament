import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'friendly-tournament-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  key: string |null
  constructor() {
  }

  ngOnInit(): void {
      this.key = localStorage.getItem('authJwtToken');
  }
}
