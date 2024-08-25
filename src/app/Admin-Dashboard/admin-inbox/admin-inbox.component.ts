import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../../message.service';
import { SocketService } from '../../socket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css']
})
export class AdminInboxComponent implements OnInit {
  messages: any[] = [];
  showReplyPanelVisible: boolean = false;
  replyToSenderID: number | null = null;
  replyToSenderName: string = '';
  replySubject: string = '';
  replyContent: string = '';

  constructor(
    private messageService: MessageService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadMessages();

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

  showReplyPanel(senderID: number): void {
    this.replyToSenderID = senderID;
    this.replyToSenderName = this.messages.find(message => message.SenderID === senderID)?.SenderName || '';
    this.showReplyPanelVisible = true;
  }

  hideReplyPanel(): void {
    this.showReplyPanelVisible = false;
    this.replySubject = '';
    this.replyContent = '';
  }

  sendReply(): void {
    if (this.replyToSenderID === null) return;
  
    // Fetch the index number of the receiver using the sender's UserID
    this.http.get<any>(`http://godinberto.pythonanywhere.com/api/v1/usersStudent?user_id=${this.replyToSenderID}`).subscribe(
      data => {
        // Log the entire response to inspect its structure
        console.log('Received data from usersStudent API:', data);
  
        // Check if 'users' exists and is an array with at least one item
        if (data && Array.isArray(data.users) && data.users.length > 0) {
          const user = data.users[0]; // Assuming we are interested in the first user
          console.log('User data:', user);
  
          const receiverIndex = user?.Index_Number; // Adjust based on the actual response structure
          if (receiverIndex) {
            // Log the receiver index number
            console.log('Receiver index number:', receiverIndex);
  
            // Send the message using the receiver's index number
            this.http.post('http://godinberto.pythonanywhere.com/api/v1/sendMessageAdmin', {
              receiver_index: receiverIndex,
              content: this.replyContent,
              subject: this.replySubject
            }).subscribe(
              response => {
                console.log('Message sent successfully:', response);
                this.hideReplyPanel();
              },
              error => {
                console.error('Failed to send message:', error);
              }
            );
          } else {
            console.error('Index number not found for receiver');
          }
        } else {
          console.error('Receiver data not found or invalid response structure');
        }
      },
      error => {
        console.error('Failed to fetch receiver index:', error);
      }
    );
  }
  
  
  
  
}
