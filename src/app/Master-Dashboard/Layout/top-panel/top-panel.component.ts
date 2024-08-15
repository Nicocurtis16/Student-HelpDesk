import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit {
  activeRouteName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveRouteName();
      }
    });
    // Initial set on component load
    this.setActiveRouteName();
  }

  private setActiveRouteName(): void {
    const currentRoute = this.router.url.toLowerCase(); // Make it case-insensitive
  
    if (currentRoute.includes('/dashboard')) {
      this.activeRouteName = 'Dashboard';
    } else if (currentRoute.includes('/faq')) {
      this.activeRouteName = 'FAQ';
    } else if (currentRoute.includes('/student')) { // Check for '/student' before 'Manage Users'
      this.activeRouteName = 'Student';
    } else if (currentRoute.includes('/admin')) {
      this.activeRouteName = 'Adminstrator';
    } else if (currentRoute.includes('/settings')) {
      this.activeRouteName = 'Settings';
    } else {
      this.activeRouteName = 'Manage Users';
    }
  }
  
}
