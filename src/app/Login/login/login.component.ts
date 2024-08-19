import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  errorMessage: string = ''; // Add this property

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login() {
    const loginPayload = {
      username: this.username,
      password: this.password,
    };

    this.http.post('http://godinberto.pythonanywhere.com/api/v1/staff/login', loginPayload)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('username', response.username);
          console.log('Login Response:', response);
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            if (response.role === 'Super Admin') {
              this.router.navigate(['/dashboard']);
            } else if (response.role === 'Admin') {
              this.router.navigate(['/Admin/dashboard']);
            }
          }
        },
        (error: any) => {
          console.error('Login Error:', error);
          this.errorMessage = 'Invalid username or password'; // Set the error message
        }
      );
  }
}

