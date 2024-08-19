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

  isTokenValid(token: string): boolean {
    try {
      const [header, payload, signature] = token.split('.');

      if (!header || !payload || !signature) {
        return false; // Invalid token format
      }

      // Decode base64 parts
      const decodedPayload = this.base64UrlDecode(payload);
      const parsedPayload = JSON.parse(decodedPayload);

      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (parsedPayload.exp < currentTime) {
        return false; // Token is expired
      }

      return true;
    } catch (error) {
      // Handle any decoding errors
      console.error('Token validation error:', error);
      return false;
    }
  }

  base64UrlDecode(base64Url: string): string {
    const base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const decoded = atob(base64);
    return decoded;
  }
}
