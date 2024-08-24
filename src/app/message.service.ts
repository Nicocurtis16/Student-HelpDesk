import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://godinberto.pythonanywhere.com/api/v1';

  constructor(private http: HttpClient) {}

  sendMessage(content: string, subject: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sendMessage`, { content, subject });
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getMessages`);
  }

  getSentMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSentMessages`);
  }

  getReceivedMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getReceivedMessages`);
  }

  searchMessages(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/searchMessages`, { params: { query } });
  }

  getMessageById(messageId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getMessageByID/${messageId}`);
  }

  deleteMessage(messageId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteMessage/${messageId}`);
  }
}
