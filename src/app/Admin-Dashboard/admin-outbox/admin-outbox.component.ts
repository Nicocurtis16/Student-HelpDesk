import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-admin-outbox',
  templateUrl: './admin-outbox.component.html',
  styleUrls: ['./admin-outbox.component.css']
})
export class AdminOutboxComponent implements OnInit, OnDestroy {
  messages: any[] = [];  // Array to store the messages
  isMessageFormVisible: boolean = false; // To show/hide message form modal
  showReplyPanelVisible: boolean = false; // To show/hide reply panel modal
  replyToSenderName: string = ''; // Name of the sender for reply
  replySubject: string = ''; // Subject of the reply
  replyContent: string = ''; // Content of the reply
  senderIndexNumber: string | null = null; // Sender Index Number
  private refreshSubscription: Subscription = new Subscription(); // To manage the interval subscription

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSentMessages(); // Fetch sent messages initially

    // Set up auto-refresh every 5 seconds
    this.refreshSubscription.add(
      timer(0, 5000).subscribe(() => this.getSentMessages())
    );
  }

  ngOnDestroy(): void {
    // Clean up the subscription to avoid memory leaks
    this.refreshSubscription.unsubscribe();
  }

  getSentMessages(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });

    this.http.get('http://godinberto.pythonanywhere.com/api/v1/getSentMessages', { headers }).subscribe(
      (response: any) => {
        this.messages = response.message_list || [];
        console.log('Fetched sent messages:', this.messages);
      },
      (error) => {
        console.error('Error fetching sent messages:', error.message || error);
      }
    );
  }

  // Show the message form modal
  showMessageForm(): void {
    this.isMessageFormVisible = true;
  }

  // Handle the form close event
  handleFormClose(): void {
    this.isMessageFormVisible = false;
  }

  // Hide the reply panel
  hideReplyPanel(): void {
    this.showReplyPanelVisible = false;
  }

  // Send a reply (implementation not shown in your code snippet)
  sendReply(): void {
    // Implementation for sending a reply
  }
}
