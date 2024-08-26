import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private newMessageSubject = new Subject<any>(); 

  constructor() {
    this.socket = io('https://godinberto.pythonanywhere.com'); // Your backend URL
    this.initializeSocketEvents();
  }

  private initializeSocketEvents(): void {
    this.socket.on('new_message', (message: any) => {
      console.log('New message received:', message); // Log received message
      this.newMessageSubject.next(message);
    });
  }

  connect(): void {
    if (!this.socket) {
      this.socket = io('http://godinberto.pythonanywhere.com'); // Your backend URL
      this.initializeSocketEvents();
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  onNewMessage(): Observable<any> {
    return this.newMessageSubject.asObservable();
  }
}
