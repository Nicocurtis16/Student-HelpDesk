import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  showPopup = false;
  popupMessage = '';
  showDeleteModal = false;
  showModal = false;
  isEditUserVisible = false;
  showForm = false;
  studentDataList: any[] = [];

  studentData = {
    username: '',
    email: '',
    password: '',
    phone_number: '',
    index_number: '',
    department: '',
    role: 'Student'
  };

  topics = ['Admission', 'Portal', 'Department'];
  faqQuestion = '';
  faqAnswer = '';
  faqTopic = '';

  userId: string | null = null; // Ensure userId is initialized
  userName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudentData();
  }

  fetchStudentData(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://godinberto.pythonanywhere.com/api/v1/usersStudent', { headers })
      .subscribe(response => {
        console.log('API Response:', response); // Log the response
        if (response.Users && Array.isArray(response.Users)) {
          this.studentDataList = response.Users;
        } else {
          console.error('API response does not contain expected data:', response);
        }
      }, error => {
        console.error('Error fetching student data', error);
      });
  }

  inviteStudent(): void {
    const apiUrl = 'http://godinberto.pythonanywhere.com/api/v1/superadmin/register';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post(apiUrl, this.studentData, { headers })
      .subscribe(
        response => {
          this.toggleForm();
          this.popupMessage = 'Student registered successfully!';
          this.showPopup = true;
          this.studentData = {
            username: '',
            email: '',
            password: '',
            phone_number: '',
            index_number: '',
            department: '',
            role: 'Student'
          };
        },
        error => {
          console.error('Error adding student', error);
          this.popupMessage = error.status === 400 && error.error.message 
            ? error.error.message 
            : 'Error adding student. Please try again.';
          this.showPopup = true;
        }
      );
  }

  closePopup(): void {
    this.showPopup = false;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  editUser(student: any): void {
    this.isEditUserVisible = true;
    this.showModal = true;
    console.log('Editing user:', student);
  }

  deleteUser(student: any): void {
    this.userName = student.Username; // Set the username for confirmation
    this.userId = student.UserID; // Set the user ID for deletion (you can change this to student.AdminID if you prefer)
    this.showDeleteModal = true; // Show the delete confirmation modal
}

confirmDelete(): void {
    if (this.userId === null) return; // Ensure userId is set

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create HttpHeaders object with Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make the delete request using the user ID
    this.http.delete(`http://godinberto.pythonanywhere.com/api/v1/users/${this.userId}`, { headers })
      .subscribe(response => {
        console.log('User deleted successfully', response);

        // Remove the deleted user from the studentDataList array
        this.studentDataList = this.studentDataList.filter(student => student.UserID !== this.userId);

        this.showDeleteModal = false; // Hide the delete confirmation modal
      }, error => {
        console.error('Error deleting user', error);
        this.showDeleteModal = false; // Hide the delete confirmation modal
      });
}



  closeModal(): void {
    this.showModal = false;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  cancelEdit(): void {
    this.isEditUserVisible = false;
  }

  saveFAQ(): void {
    // Logic for saving FAQ
    console.log('Save FAQ:', this.faqQuestion, this.faqAnswer, this.faqTopic);
  }

  handleNextClick(): void {
    // Handle 'Next' button click
    console.log('Next button clicked');
  }

  handleButtonClick(): void {
    // Handle button click
    console.log('Button clicked');
  }
}
