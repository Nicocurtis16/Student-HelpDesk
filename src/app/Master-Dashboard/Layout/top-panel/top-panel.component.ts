import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit {
  username: string = '';
  firstLetter: string = '';
  secondLetter: string = '';
  activeRouteName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch the username from localStorage when the component initializes
    this.fetchUsernameFromLocalStorage();

    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveRouteName();
      }
    });

    // Initial set on component load
    this.setActiveRouteName();
  }

  private fetchUsernameFromLocalStorage(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.username = username;
      this.firstLetter = this.username.charAt(0).toUpperCase();
      this.secondLetter = this.username.charAt(1) ? this.username.charAt(1).toUpperCase() : '';
    } else {
      console.error('Username not found in local storage');
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
    } else {
      this.activeRouteName = 'Manage Users';
    }
  }
}
