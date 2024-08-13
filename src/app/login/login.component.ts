import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { UserValidationService } from './user-validation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userValidationService: UserValidationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { firstName, email } = this.loginForm.value;
      this.userValidationService.validateUser(firstName, email).subscribe(
        (response) => {
          if (response) {
            // Successful login
            localStorage.setItem('user', JSON.stringify(response));
            this.errorMessage = '';
            console.log('Login successful', response);
            this.router.navigate(['/homepage']);
          } else {
            // Failed login
            this.errorMessage = 'Invalid credentials. Please try again.';
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Login error', error);
          if (error.status === 401) {
            this.errorMessage = 'Authentication failed. Please check your credentials.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      );
    }
  }
}