import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './Master-Dashboard/Layout/student/student.component';
import { SidebarComponent } from './Master-Dashboard/Layout/sidebar/sidebar.component';

// Define your routes here
const routes: Routes = [
  { path: '', component: SidebarComponent }, // Replace SidebarComponent with the default component or leave it as is.
  { path: 'Student', component: StudentComponent },
  { path: 'sidebar', component: SidebarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
