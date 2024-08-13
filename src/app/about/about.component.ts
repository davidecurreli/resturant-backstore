import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition(':enter', [
        animate('0.5s ease-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ]),
    trigger('scaleIn', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.9)'
      })),
      transition(':enter', [
        animate('0.5s ease-out', style({
          opacity: 1,
          transform: 'scale(1)'
        }))
      ])
    ])
  ]
})
export class AboutComponent {
  teamMembers = [
    { name: 'John Doe', role: 'Head Chef', image: './assets/chef1.png' },
    { name: 'Jane Smith', role: 'Restaurant Manager', image: '/assets/chef2.png' },
    { name: 'Mike Johnson', role: 'Sous Chef', image: 'assets/chef3.png' }
  ];
}