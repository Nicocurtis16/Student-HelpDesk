import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent {
  showDeleteModal = false;
  showModal = false;
  showForm = false;
  showPopup = false; // Controls the visibility of the popup
  popupMessage = ''; // Stores the message from the API

  // Input fields for admin account creation
  adminData = {
    username: '',
    email: '',
    password: '',
    phone_number: '',
    department: '',
    role: 'Admin' // Added role field
  };

  // Dummy data for demonstration
  adminEdit: any = {};
  adminDataList = [
    { username: 'Jane Cooper', email: 'janecooper@gmail.com', topic: 'IT Department' }
  ];

  constructor(private http: HttpClient) {}

  editUser(adminData: any) {
    this.adminEdit = adminData; // Populate form with selected admin data
    this.showModal = true;
  }

  saveFAQ() {
    console.log('FAQ saved successfully');
  }

  handleNextClick() {
    console.log('Next button clicked');
  }

  handleButtonClick() {
    console.log('Button clicked');
  }

  closeModal() {
    this.showModal = false;
  }

  deleteUser(adminData: any) {
    console.log('Deleting user:', adminData);
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  cancelEdit() {
    this.showModal = false;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  inviteAdmin() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create HttpHeaders object with Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://godinberto.pythonanywhere.com/api/v1/superadmin/register', this.adminData, { headers })
      .subscribe(response => {
        console.log('Admin invited successfully', response);
        this.showForm = false;
        this.popupMessage = 'Admin registered successfully!'; // Update message
        this.showPopup = true; // Show popup
        // Optionally reset form data
        this.adminData = {
          username: '',
          email: '',
          password: '',
          phone_number: '',
          department: '',
          role: 'Admin'
        };
      }, error => {
        console.error('Error inviting admin', error);
        this.popupMessage = 'Error inviting admin. Please try again.'; // Update message
        this.showPopup = true; // Show popup
      });
  }

  closePopup() {
    this.showPopup = false;
    this.popupMessage = ''; // Clear message
  }
}
