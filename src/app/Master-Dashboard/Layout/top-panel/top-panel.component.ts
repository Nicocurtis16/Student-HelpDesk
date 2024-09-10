import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit {
  fullName: string = '';
  firstLetter: string = '';
  lastLetter: string = '';
  activeRouteName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch the full name from localStorage when the component initializes
    this.fetchNameFromLocalStorage();

    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveRouteName();
      }
    });

    // Initial set on component load
    this.setActiveRouteName();
  }

  private fetchNameFromLocalStorage(): void {
    const fullName = localStorage.getItem('FullName');
    console.log('FullName from localStorage:', fullName);  // Log for debugging
    if (fullName) {
      this.fullName = fullName;
      const nameParts = this.fullName.split(' ');
      this.firstLetter = nameParts[0].charAt(0).toUpperCase();
      this.lastLetter = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : '';
    } else {
      console.error('Full name not found in local storage');
    }
  }
  

  private setActiveRouteName(): void {
    const currentRoute = this.router.url.toLowerCase();

    if (currentRoute.includes('/dashboard')) {
      this.activeRouteName = 'Dashboard';
    } else if (currentRoute.includes('/faq')) {
      this.activeRouteName = 'FAQ';
    } else if (currentRoute.includes('/student')) {
      this.activeRouteName = 'Student';
    } else if (currentRoute.includes('/admin')) {
      this.activeRouteName = 'Administrator';
    } else if (currentRoute.includes('/settings')) {
      this.activeRouteName = 'Settings';
    } else if (currentRoute.includes('/Admin/inbox')) {
      this.activeRouteName = 'Inbox';
    } else {
      this.activeRouteName = 'Manage Users';
    }
  }
}
