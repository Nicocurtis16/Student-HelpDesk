import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './Master-Dashboard/Layout/student/student.component';
import { SidebarComponent } from './Master-Dashboard/Layout/sidebar/sidebar.component';
import { FAQComponent } from './Master-Dashboard/faq/faq.component';
import { DashboardMainComponent } from './Master-Dashboard/dashboard-main/dashboard-main.component';
import { SettingsComponent } from './Master-Dashboard/settings/settings.component';
import { AdminMainComponent } from './Master-Dashboard/admin-main/admin-main.component';

// Define your routes here
const routes: Routes = [
  { path: '', component: DashboardMainComponent }, // Replace SidebarComponent with the default component or leave it as is.
  { path: 'Student', component: StudentComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'dashboard', component: DashboardMainComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'admin', component: AdminMainComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
