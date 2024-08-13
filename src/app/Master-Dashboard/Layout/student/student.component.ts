import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  editUser() {
    // Your logic for editing a user
    console.log('Edit User button clicked');
  }

  deleteUser() {
    // Your logic for deleting a user
    console.log('Delete User button clicked');
  }
  handleNextClick() {
    // Your logic for handling the button click
    console.log('Next button clicked');
  }

  handleButtonClick() {
    // Your logic for handling button click
    console.log('Button clicked');
  }
  
}

