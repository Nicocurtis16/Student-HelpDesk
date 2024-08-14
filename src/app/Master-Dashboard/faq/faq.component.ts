import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  showDeleteModal = false;
  showModal = false; // Controls modal visibility
  faqQuestion = '';
  faqAnswer = '';
  faqTopic = '';
  topics = ['Admission', 'Portal', 'Department']; // Example topics

  

  editUser() {
    this.isEditUserVisible = true;
    // Your logic for editing a user
    console.log('Edit User button clicked');
    this.showModal=true;
  }
  saveFAQ(){
    console.log('saved sucessfully')
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
  closeModal() {
    this.showModal = false;
  }
  deleteUser() {
    this.showDeleteModal = true;
    console.log('Delete User button clicked');
  }

  // Method to hide the Delete confirmation modal
  closeDeleteModal() {
    this.showDeleteModal = false;
  }


}
