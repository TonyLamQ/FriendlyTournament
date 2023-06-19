import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'friendly-tournament-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  key: string | null
  constructor(private router: Router, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.key = localStorage.getItem('authJwtToken');
  }

  ngAfterViewInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  logout() {
    this.key = localStorage.getItem('authJwtToken');
    if (this.key) {
      localStorage.removeItem('authJwtToken');
      this.router.navigateByUrl('/login').then(() => {
        alert('You have been logged out!');
      });
    } else {
      alert('You are not logged in!');
      this.router.navigateByUrl('/about')
    }
  }

  onGetFriends() {
    this.key = localStorage.getItem('authJwtToken');
    if (this.key) {
      this.router.navigateByUrl('/friends');
    } else {
      alert('You are not logged in!');
      this.router.navigateByUrl('/about')
    }
  }
}
