import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private getAllMessagesApiUrl = 'https://godinberto.pythonanywhere.com/api/v1/admin/getAllUserMessages'; // Fetch all messages
  private searchApiUrl = 'https://godinberto.pythonanywhere.com/api/v1/searchMessages'; // Search messages
  private respondApiUrl = 'https://godinberto.pythonanywhere.com/api/v1/admin/respond'; // Respond to messages

  constructor(private http: HttpClient) {}

  // Method to fetch all messages
  getMessages(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.get<any>(this.getAllMessagesApiUrl, { headers });
  }

  // Method to search messages
  searchMessages(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.searchApiUrl, { headers, params: { query } });
  }

  // Method to respond to a specific message
  respondToMessage(messageId: number, replyContent: string): Observable<any> {
    const body = {
      MessageID: messageId.toString(), // Ensure MessageID is in the correct format if needed
      Reply: replyContent
    };
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    
    return this.http.put(this.respondApiUrl, body, { headers });
  }
  
  
}
