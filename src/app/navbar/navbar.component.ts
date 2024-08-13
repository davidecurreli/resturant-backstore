import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}