import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  @Output() close = new EventEmitter<void>(); // Emit event to close the form

  subject: string = '';
  content: string = '';
  students: any[] = [];
  selectedStudentIndex: string = ''; // Use Index_Number instead of ID
  isPopupVisible: boolean = false; // Track popup visibility
  popupMessage: string = ''; // Message to display in the popup

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAssignedStudents(); // Load assigned students for messaging
  }

  hideMessageForm(): void {
    this.close.emit(); // Emit close event
  }

  showPopup(message: string): void {
    this.popupMessage = message;
    this.isPopupVisible = true;
    setTimeout(() => this.closePopup(), 3000); // Automatically close popup after 3 seconds
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  getAssignedStudents(): void {
    const headers = { 
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
      'Content-Type': 'application/json'
    };

    this.http.get('http://godinberto.pythonanywhere.com/api/v1/studentsForAdmin', { headers }).subscribe(
      (response: any) => {
        console.log('Full API Response:', response);
        if (response.Students) {
          this.students = response.Students;
          console.log('Assigned Students:', this.students);
        } else {
          console.error('No students found in response.');
        }
      },
      (error) => {
        console.error('Error fetching students:', error.message || error);
      }
    );
  }

  sendMessage(): void {
    const messageData = {
      receiver_index: this.selectedStudentIndex, // Use Index_Number
      subject: this.subject,
      content: this.content
    };

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    };

    this.http.post('http://godinberto.pythonanywhere.com/api/v1/sendMessageAdmin', messageData, { headers }).subscribe(
      (response: any) => {
        console.log('Message sent response:', response);
        this.showPopup('Message sent successfully!');
      },
      (error) => {
        console.error('Error sending message:', error.message || error);
        this.showPopup('Failed to send message. Please try again.');
      }
    );
    this.hideMessageForm(); // Close the modal after message is sent
  }
}
