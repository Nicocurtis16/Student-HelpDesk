import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
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

  

  

  showForm = false;

 
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



 

 
  


  
  cancelEdit() {
    this.isEditUserVisible = false;
  }
  


  toggleForm() {
    this.showForm = !this.showForm;
  }
  
}

