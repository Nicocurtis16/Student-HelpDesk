import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  showModal = false;

  editUser() {
    this.isEditUserVisible = true;
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
  isEditUserVisible: boolean = false;

  
  cancelEdit() {
    this.isEditUserVisible = false;
  }
  

  showForm = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }
  

}
