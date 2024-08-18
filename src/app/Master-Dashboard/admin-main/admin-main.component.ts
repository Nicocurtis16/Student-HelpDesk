import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit, OnDestroy {
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

  // Data from the API
  adminDataList: any[] = [];
  adminEdit: any; // Define adminEdit property

  // Properties for delete confirmation
  userName: string = '';
  userId: number | null = null;

  // Interval reference
  private intervalId: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAdminData();
    // Set interval to refresh admin data every 10 seconds
    this.intervalId = setInterval(() => {
      this.loadAdminData();
    }, 10000); // 10000 milliseconds = 10 seconds
  }

  ngOnDestroy() {
    // Clear interval when component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadAdminData() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create HttpHeaders object with Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://godinberto.pythonanywhere.com/api/v1/usersAdmin', { headers })
      .subscribe(response => {
        if (response.Users && Array.isArray(response.Users)) {
          this.adminDataList = response.Users;
        } else {
          console.error('API response does not contain expected data:', response);
        }
      }, error => {
        console.error('Error fetching admin data', error);
      });
  }

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
    this.userName = adminData.Username; // Set the username for confirmation
    this.userId = adminData.UserID; // Set the user ID for deletion
    this.showDeleteModal = true; // Show the delete confirmation modal
  }

  confirmDelete() {
    if (this.userId === null) return; // Ensure userId is set

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create HttpHeaders object with Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://godinberto.pythonanywhere.com/api/v1/users/${this.userId}`, { headers })
      .subscribe(response => {
        console.log('User deleted successfully', response);
        this.loadAdminData(); // Refresh admin data
        this.showDeleteModal = false; // Hide the delete confirmation modal
      }, error => {
        console.error('Error deleting user', error);
        this.showDeleteModal = false; // Hide the delete confirmation modal
      });
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
