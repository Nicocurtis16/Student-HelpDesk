import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

  isExpanded = false;

  constructor(private router: Router) {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    // Remove token or any other authentication data
    localStorage.removeItem('token');

    // Optionally, you can also clear session storage or other related data
    sessionStorage.clear();

    // Redirect to login page
    this.router.navigate(['/login']);
    
      
    
    
  }
}
