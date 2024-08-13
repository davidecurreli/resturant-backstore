import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition(':enter', [
        animate('0.5s ease-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
})
export class HomepageComponent implements OnInit {
  firstName: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.firstName = user.firstName;

    if (!this.firstName) {
      // User is not authenticated, redirect to login
      this.router.navigate(['/login'], {
        queryParams: {
          message: 'Please log in to access the page'
        }
      });
    }
  }
}