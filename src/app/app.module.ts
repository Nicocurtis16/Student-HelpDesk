import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { LoginComponent } from '../app/Login/login/login.component';
import { SidebarComponent } from './Master-Dashboard/Layout/sidebar/sidebar.component';
import { StudentComponent } from './Master-Dashboard/Layout/student/student.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TopPanelComponent } from './Master-Dashboard/Layout/top-panel/top-panel.component';
import { FAQComponent } from './Master-Dashboard/faq/faq.component';
import { DashboardMainComponent } from './Master-Dashboard/dashboard-main/dashboard-main.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    StudentComponent,
    TopPanelComponent,
    FAQComponent,
    DashboardMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Make sure AppRoutingModule is imported here
    RouterModule, 
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
