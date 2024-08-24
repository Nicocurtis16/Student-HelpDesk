import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {}

  
  connect() {
    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('Successfully connected to WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  joinRoom(room: string) {
    this.socket.emit('join', room);
  }

  leaveRoom(room: string) {
    this.socket.emit('leave', room);
  }

  // New method to listen for new messages
  onNewMessage(): Observable<any> {
    return this.socket.fromEvent('new_message');
  }
}
