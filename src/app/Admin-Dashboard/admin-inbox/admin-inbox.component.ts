import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../../message.service';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css']
})
export class AdminInboxComponent implements OnInit {
  messages: any[] = [];

  constructor(private messageService: MessageService, private socketService: SocketService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadMessages();

    // Listen for new messages and refresh the message list
    this.socketService.onNewMessage().subscribe(message => {
      console.log('New message event received:', message);
      this.loadMessages(); // Reload messages when a new one arrives
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(data => {
      console.log('Messages loaded:', data.message_list);
      this.messages = data.message_list; // Update message list
    });
  }
}
