import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'https://godinberto.pythonanywhere.com/api/v1/admin/respond'; // Use the same endpoint

  constructor(private http: HttpClient) {}

  // Method to fetch all unresponded messages (GET request)
  getMessages(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.get<any>(this.apiUrl, { headers }); // No need to pass action as param
  }

  // Method to respond to a specific message (PUT request)
  respondToMessage(messageId: number, replyContent: string): Observable<any> {
    const body = {
      MessageID: messageId.toString(),  // Send the message ID as a string
      Reply: replyContent               // Include the reply content
    };
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    
    return this.http.put(this.apiUrl, body, { headers }); // Use PUT for response
  }
}
