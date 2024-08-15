import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token && this.isTokenValid(token)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // Dummy function to check token validity
  isTokenValid(token: string): boolean {
    // Implement your token validation logic here
    // Example: Check token expiry date or call API to validate
    return true; // Replace with actual validation logic
  }
}
