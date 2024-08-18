import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './Master-Dashboard/Layout/student/student.component';
import { SidebarComponent } from './Master-Dashboard/Layout/sidebar/sidebar.component';
import { FAQComponent } from './Master-Dashboard/faq/faq.component';
import { DashboardMainComponent } from './Master-Dashboard/dashboard-main/dashboard-main.component';
import { SettingsComponent } from './Master-Dashboard/settings/settings.component';
import { AdminMainComponent } from './Master-Dashboard/admin-main/admin-main.component';
import { LoginComponent } from './Login/login/login.component';
import { AdministratorComponent } from './Admin-Dashboard/administrator/administrator.component';
import { AuthGuard } from './AuthGuard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardMainComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminMainComponent, canActivate: [AuthGuard] },
  { path: 'Student', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
  { path: 'faq', component: FAQComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdministratorComponent, canActivate: [AuthGuard] },

  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
