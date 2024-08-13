import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  isAboutPage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAboutPage = event.urlAfterRedirects === '/about';
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}