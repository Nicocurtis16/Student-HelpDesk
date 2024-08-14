// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://your-api-url'; // Adjust the URL as needed

//   constructor(private http: HttpClient) {}

//   getAdminDetails(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/admin/details`);
//   }

//   updateProfile(profile: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/admin/update-profile`, profile);
//   }

//   changePassword(passwords: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/admin/change-password`, passwords);
//   }
// }
