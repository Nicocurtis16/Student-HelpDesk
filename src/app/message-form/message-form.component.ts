import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service'; // Ensure correct service is imported
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
  selectedStudentId: string = '';

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
        console.log('Full API Response:', response); // Log the entire response object
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
      receiver_id: this.selectedStudentId,
      subject: this.subject,
      content: this.content
    };
    // Add code to send the message
  }
}
