import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  errorMessage: string = ''; // Add this property

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login() {
    const loginPayload = {
      email: this.email,
      password: this.password,
    };

    this.http.post('https://godinberto.pythonanywhere.com/api/v1/staff/login', loginPayload)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.access_token);
          if (response.FullName) {
            localStorage.setItem('FullName', response.FullName);
            console.log('FullName stored:', response.FullName);
          } else {
            console.error('FullName not found in the login response');
          }

          localStorage.setItem('email', response.email);
          console.log('Login Response:', response);
          if (response.access_token) {
            if (response.role === 'Super Admin') {
              this.router.navigate(['/dashboard']);
            } else if (response.role === 'Admin') {
              this.router.navigate(['/Admin/dashboard']);
            }
          }
        },
        (error: any) => {
          console.error('Login Error:', error);
          this.errorMessage = 'Invalid email or password'; // Set the error message
        }
      );
  }
}
