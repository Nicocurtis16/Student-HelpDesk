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
  showPopup = false;
  popupMessage = '';

  adminData = {
    username: '',
    email: '',
    password: '',
    phone_number: '',
    department: '',
    role: 'Admin'
  };

  adminDataList: any[] = [];
  paginatedAdminList: any[] = [];
  adminEdit: any;
  
  userName: string = '';
  userId: number | null = null;
  
  private intervalId: any;
  public currentPage: number = 0;  // Changed from private to public
  public pageSize: number = 7;     // Changed from private to public

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAdminData();
    this.intervalId = setInterval(() => {
      this.loadAdminData();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadAdminData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://godinberto.pythonanywhere.com/api/v1/usersAdmin', { headers })
      .subscribe(response => {
        if (response.Users && Array.isArray(response.Users)) {
          this.adminDataList = response.Users;
          this.paginateData();
        } else {
          console.error('API response does not contain expected data:', response);
        }
      }, error => {
        console.error('Error fetching admin data', error);
      });
  }

  paginateData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAdminList = this.adminDataList.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.adminDataList.length) {
      this.currentPage++;
      this.paginateData();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginateData();
    }
  }

  editUser(adminData: any) {
    this.adminEdit = adminData;
    this.showModal = true;
  }

  saveFAQ() {
    console.log('FAQ saved successfully');
  }

  closeModal() {
    this.showModal = false;
  }

  deleteUser(adminData: any) {
    this.userName = adminData.Username;
    this.userId = adminData.UserID;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.userId === null) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://godinberto.pythonanywhere.com/api/v1/users/${this.userId}`, { headers })
      .subscribe(response => {
        console.log('User deleted successfully', response);
        this.loadAdminData();
        this.showDeleteModal = false;
      }, error => {
        console.error('Error deleting user', error);
        this.showDeleteModal = false;
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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Ensure the content type is set
    });
  
    // Prepare the payload as per API's expected format
    const payload = {
      users: [this.adminData]
    };
  
    this.http.post('http://godinberto.pythonanywhere.com/api/v1/superadmin/register', payload, { headers })
      .subscribe(response => {
        console.log('Admin invited successfully', response);
        this.showForm = false;
        this.popupMessage = 'Admin registered successfully!';
        this.showPopup = true;
        
        // Reset adminData including index_number
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
        this.popupMessage = 'Error inviting admin. Please try again.';
        this.showPopup = true;
      });
  }
  

  closePopup() {
    this.showPopup = false;
    this.popupMessage = '';
  }
}
