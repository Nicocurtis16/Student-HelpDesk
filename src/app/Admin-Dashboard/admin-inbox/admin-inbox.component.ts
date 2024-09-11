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
  senderIndexNumber: string = ''; // Store the sender's index number

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

    // Fetch sender's index number
    this.fetchSenderIndexNumber(senderID);

    this.showReplyPanelVisible = true;
  }

  fetchSenderIndexNumber(senderID: number): void {
    this.http.get<any>(`http://godinberto.pythonanywhere.com/api/v1/users?user_id=${senderID}`).subscribe(
      data => {
        // Log the entire response to inspect its structure
        console.log('Received data from users API:', data);
  
        // Check if 'Users' exists and is an array
        if (data && Array.isArray(data.Users)) {
          // Find the user with the matching UserID
          const user = data.Users.find(user => user.UserID === senderID);
          if (user) {
            this.senderIndexNumber = user.Index_Number || ''; // Update sender index number
            console.log('Sender index number:', this.senderIndexNumber);
          } else {
            console.error('User not found in the response');
          }
        } else {
          console.error('Invalid response structure');
        }
      },
      error => {
        console.error('Failed to fetch sender index:', error);
      }
    );
  }
  

  hideReplyPanel(): void {
    this.showReplyPanelVisible = false;
    this.replySubject = '';
    this.replyContent = '';
    this.senderIndexNumber = ''; // Clear sender index number
  }
  onSearch(query: string): void {
    if (query.trim()) {
      this.messageService.searchMessages(query).subscribe(data => {
        console.log('Search results:', data.message_list);
        this.messages = data.message_list; // Update message list with search results
      });
    } else {
      // If query is empty, load all messages
      this.loadMessages();
    }
  }

  sendReply(): void {
    if (this.replyToSenderID === null || !this.senderIndexNumber) return;

    // Send the message using the sender's index number
    this.http.post('https://godinberto.pythonanywhere.com/api/v1/sendMessageAdmin', {
      receiver_index: this.senderIndexNumber,
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
  }
 

  isMessageFormVisible: boolean = false;


  showMessageForm(): void {
    this.isMessageFormVisible = true; // Show the message form
  }
  
  hideMessageForm(): void {
    this.isMessageFormVisible = false; // Hide the message form
  }

  handleFormClose(): void {
    this.hideMessageForm(); // Handle form close
  }
}
