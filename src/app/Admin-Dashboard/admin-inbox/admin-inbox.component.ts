import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css'] // Ensure this points to the correct CSS file
})
export class AdminInboxComponent implements OnInit {
  messages: any[] = [];

  constructor(private messageService: MessageService, private socketService: SocketService) {}

  ngOnInit(): void {
    this.loadMessages();

    // Listening for new messages using SocketService
    this.socketService.onNewMessage().subscribe(message => {
      this.messages.push(message);
    });
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data.message_list; // Ensure your data structure is correct here
    });
  }
}
