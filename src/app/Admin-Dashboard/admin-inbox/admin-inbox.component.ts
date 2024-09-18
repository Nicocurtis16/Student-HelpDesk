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
  showReplyPanelVisible: boolean = false;
  replyToSenderID: number | null = null;
  replyToSenderName: string = '';
  replyContent: string = '';
  senderIndexNumber: string = '';
  messages: any[] = [];
  selectedMessageId: number | null = null; // Add this line
  // Add this boolean property to control the visibility of the message form
  isMessageFormVisible: boolean = false;

  constructor(
    private messageService: MessageService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadMessages();

    // Listen for new messages via Socket
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

  showReplyPanel(message: any): void {
    this.replyToSenderID = message.SenderID;
    this.replyToSenderName = message.SenderName;
    this.selectedMessageId = message.MessageID; // Store the selected message ID
  
    this.showReplyPanelVisible = true;
  }
  

  hideReplyPanel(): void {
    this.showReplyPanelVisible = false;
    this.replyContent = ''; // Reset reply content
  }

  sendReply(): void {
    if (this.selectedMessageId && this.replyContent.trim()) {
      this.messageService.respondToMessage(this.selectedMessageId, this.replyContent).subscribe(
        response => {
          console.log('Reply sent successfully:', response);
          alert('Reply sent successfully');
          this.hideReplyPanel(); // Close the reply panel after successful reply
        },
        error => {
          console.error('Error sending reply:', error);
          alert('Failed to send reply');
        }
      );
    } else {
      alert('Please provide a valid reply');
    }
  }
  

  fetchSenderIndexNumber(senderID: number): void {
    this.http.get(`http://godinberto.pythonanywhere.com/api/v1/users/${senderID}`).subscribe((data: any) => {
      this.senderIndexNumber = data.Index_Number;
      console.log('Sender index number fetched:', this.senderIndexNumber);
    });
  }

  // Method to handle showing the message form
  showMessageForm(): void {
    this.isMessageFormVisible = true; // Show the message form
  }

  // Method to handle hiding the message form
  hideMessageForm(): void {
    this.isMessageFormVisible = false; // Hide the message form
  }

  handleFormClose(): void {
    this.hideMessageForm(); // Handle form close event
  }

  onSearch(query: string): void {
    if (query.trim()) {
      this.messageService.searchMessages(query).subscribe(data => {
        console.log('Search results:', data.message_list);
        this.messages = data.message_list; // Update message list with search results
      });
    } else {
      this.loadMessages(); // Load all messages if the search query is empty
    }
  }
}
