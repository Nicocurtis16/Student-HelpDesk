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

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    
  }

  login() {
    const loginPayload = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://godinberto.pythonanywhere.com/api/v1/superadmin/login', loginPayload)
      .subscribe(
        (response: any) => {
          console.log('Login Response:', response);
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            if (response.role === 'Super Admin') {
              this.router.navigate(['/dashboard']); // Redirect to Super Admin dashboard
            } else if (response.role === 'Admin') {
              this.router.navigate(['/admin-dashboard']); // Redirect to Admin dashboard
            }
          }
        },
        (error: any) => {
          console.error('Login Error:', error);
        }
      );
  }
}
