import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'https://godinberto.pythonanywhere.com/api/v1/getReceivedMessages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
