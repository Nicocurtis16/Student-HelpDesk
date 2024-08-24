import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './Master-Dashboard/Layout/student/student.component';
import { SidebarComponent } from './Master-Dashboard/Layout/sidebar/sidebar.component';
import { FAQComponent } from './Master-Dashboard/faq/faq.component';
import { DashboardMainComponent } from './Master-Dashboard/dashboard-main/dashboard-main.component';
import { SettingsComponent } from './Master-Dashboard/settings/settings.component';
import { AdminMainComponent } from './Master-Dashboard/admin-main/admin-main.component';
import { AdminSidebarComponent } from './Admin-Dashboard/admin-sidebar/admin-sidebar.component';
import { LoginComponent } from './Login/login/login.component';
import { AdministratorComponent } from './Admin-Dashboard/administrator/administrator.component';
import { AdminInboxComponent } from './Admin-Dashboard/admin-inbox/admin-inbox.component';
import { AdminSettingsComponent } from './Admin-Dashboard/admin-settings/admin-settings.component';
import { AuthGuard } from './AuthGuard';
import { MessageFormComponent } from './message-form/message-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardMainComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminMainComponent, canActivate: [AuthGuard] },
  { path: 'Student', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
  { path: 'faq', component: FAQComponent, canActivate: [AuthGuard] },
  { path: 'Admin/dashboard', component: AdministratorComponent, canActivate: [AuthGuard] },
  { path: 'Admin/inbox', component: AdminInboxComponent, canActivate: [AuthGuard] },
  { path: 'send-message', component: MessageFormComponent },

  { path: 'Admin/settings', component: AdminSettingsComponent, canActivate: [AuthGuard] },
  { path: 'admin-sidebar', component: AdminSidebarComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
