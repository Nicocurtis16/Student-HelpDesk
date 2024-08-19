import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { SidebarComponent } from './Master-Dashboard/Layout/sidebar/sidebar.component';
import { StudentComponent } from './Master-Dashboard/Layout/student/student.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TopPanelComponent } from './Master-Dashboard/Layout/top-panel/top-panel.component';
import { FAQComponent } from './Master-Dashboard/faq/faq.component';
import { DashboardMainComponent } from './Master-Dashboard/dashboard-main/dashboard-main.component';
import { SettingsComponent } from './Master-Dashboard/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminMainComponent } from './Master-Dashboard/admin-main/admin-main.component';
import { AdministratorComponent } from './Admin-Dashboard/administrator/administrator.component';
import { AdminSidebarComponent } from './Admin-Dashboard/admin-sidebar/admin-sidebar.component';
import { AdminInboxComponent } from './Admin-Dashboard/admin-inbox/admin-inbox.component';
import { AdminSettingsComponent } from './Admin-Dashboard/admin-settings/admin-settings.component';
import { AuthInterceptor } from './../app/Master-Dashboard/settings/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    StudentComponent,
    TopPanelComponent,
    FAQComponent,
    DashboardMainComponent,
    SettingsComponent,
    AdminMainComponent,
    AdministratorComponent,
    AdminSidebarComponent,
    AdminInboxComponent,
    AdminSettingsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule, 
    HttpClientModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
