import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private baseUrl = 'http://godinberto.pythonanywhere.com/api';

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(`${this.baseUrl}/getAllFaqQuestions`, { headers })
      .pipe(
        map((response) => {
          console.log('Success fetching FAQs:', response);
          return response;
        }),
        catchError((error) => {
          console.error(
            'Error fetching FAQs:',
            this.extractErrorMessage(error)
          );
          return throwError(() => error);
        })
      );
  }

  addFaq(faq: any, topic: string): Observable<any> {
    const url = `${this.baseUrl}/addFaqQuestions/${encodeURIComponent(topic)}`;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    const payload = {
      question: faq.Question,
      answer: faq.Answer,
    };

    return this.http.post<any>(url, payload, { headers }).pipe(
      map((response) => {
        console.log('Success adding FAQ:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error adding FAQ:', this.extractErrorMessage(error));
        return throwError(() => error);
      })
    );
  }

  editFaq(faq: any): Observable<any> {
    const url = `${this.baseUrl}/updateFaqQuestion/${faq.QuestionID}`;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    // Create a payload to match the API requirements
    const payload = {
      question: faq.Question,
      answer: faq.Answer,
      topic: faq.Topic, // Include the topic if the API requires it
    };

    return this.http.put<any>(url, payload, { headers }).pipe(
      map((response) => {
        console.log('Success updating FAQ:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error updating FAQ:', this.extractErrorMessage(error));
        return throwError(() => error);
      })
    );
  }

  deleteFaq(faqId: number): Observable<any> {
    // Note: Updated the endpoint with the correct format for deleting FAQ
    const url = `${this.baseUrl}/deleteFaqQuestion/${faqId}`;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(url, { headers }).pipe(
      map((response) => {
        console.log('Success deleting FAQ:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error deleting FAQ:', this.extractErrorMessage(error));
        return throwError(() => error);
      })
    );
  }

  private extractErrorMessage(error: any): string {
    if (error.error) {
      if (typeof error.error === 'string') {
        return error.error;
      } else if (typeof error.error === 'object' && error.error.error) {
        return error.error.error;
      } else {
        return JSON.stringify(error.error);
      }
    }
    return error.message || 'An unknown error occurred';
  }
}
