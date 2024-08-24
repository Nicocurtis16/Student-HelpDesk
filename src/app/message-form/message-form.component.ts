import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  subject: string = '';
  content: string = '';
  students: any[] = [];
  selectedStudentIndex: string = ''; // Use Index_Number instead of ID

  constructor(private socketService: SocketService, private http: HttpClient) {}

  ngOnInit(): void {
    this.socketService.connect(); // Ensure socket connection is established
    this.getAssignedStudents(); // Load assigned students for messaging
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
        // Optionally handle WebSocket events here if needed
      },
      (error) => {
        console.error('Error sending message:', error.message || error);
      }
    );
  }
}
