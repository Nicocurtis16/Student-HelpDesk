import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
import * as ExcelJS from 'exceljs';

import { StudentUploadPopupComponent } from './Master-Dashboard/student-upload-popup/student-upload-popup.component';
import { AdminUploadPopupComponent } from './Master-Dashboard/admin-upload-popup/admin-upload-popup.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AdminOutboxComponent } from './Admin-Dashboard/admin-outbox/admin-outbox.component';


const config: SocketIoConfig = { 
  url: 'http://godinberto.pythonanywhere.com', 
  options: {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    }
  }
};




@NgModule({ declarations: [
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
        AdminSettingsComponent,
        StudentUploadPopupComponent,
        AdminUploadPopupComponent,
        MessageFormComponent,
        AdminOutboxComponent
    ],
    
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule,
        SocketIoModule.forRoot(config),
    

        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule,
        FormsModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
