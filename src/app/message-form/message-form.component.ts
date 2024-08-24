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
        console.log('API Response:', response); // Log the entire response
        this.students = response.students; // Ensure the correct property is being accessed
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  

  // Add the missing sendMessage method here
  sendMessage(): void {
    const messageData = {
      receiver_id: this.selectedStudentId,
      subject: this.subject,
      content: this.content
   
    }
  }
}