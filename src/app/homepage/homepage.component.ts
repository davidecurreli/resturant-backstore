import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.firstName = user.firstName || 'Guest';
  }
}