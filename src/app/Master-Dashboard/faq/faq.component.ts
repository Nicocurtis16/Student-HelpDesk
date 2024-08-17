import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {
  showDeleteModal = false;
  showEditModal = false;
  showModal = false; // Controls modal visibility
  faqQuestion = '';
  faqAnswer = '';
  faqTopic = '';
  topics = ['Admission', 'Portal', 'Department']; // Example topics
  faqs: any[] = [];
  selectedFAQ: any = {};
  showForm = false;

  private baseUrl = 'http://godinberto.pythonanywhere.com/api/v1'; // Base URL for your API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFAQs();
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Replace with sessionStorage if necessary
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getFAQs(): void {
    const headers = this.getHeaders();

    this.http.get<any>(`${this.baseUrl}/getAllFaqQuestions`, { headers })
      .subscribe(
        (data) => {
          if (data && data.questions) {
            this.faqs = data.questions; // Correctly extract the FAQ list from the response
          } else {
            console.error('Unexpected API response format:', data);
          }
        },
        (error) => {
          console.error('Error fetching FAQs:', error);
        }
      );
  }

  openAddModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  addFAQ(): void {
    const newFAQ = {
      question: this.faqQuestion,
      answer: this.faqAnswer,
      topic: this.faqTopic
    };
  
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/addFaqQuestions/${encodeURIComponent(this.faqTopic)}`;
  
    this.http.post(url, newFAQ, { headers })
      .subscribe(
        () => {
          this.getFAQs(); // Refresh the list after adding
          this.closeModal();
        },
        (error) => {
          console.error('Error adding FAQ:', error);
        }
      );
  }
  

  editFAQ(faq: any): void {
    this.selectedFAQ = { ...faq };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  updateFAQ(): void {
    const headers = this.getHeaders();
  
    const payload = {
      Question: this.selectedFAQ.Question,
      Answer: this.selectedFAQ.Answer,
      Topic: this.selectedFAQ.Topic
    };
  
    this.http.put(`${this.baseUrl}/updateFaqQuestion/${this.selectedFAQ.QuestionID}`, payload, { headers })
      .subscribe(
        () => {
          this.getFAQs(); // Refresh the list after updating
          this.closeEditModal();
        },
        (error) => {
          console.error('Error updating FAQ:', error);
        }
      );
  }
  
  
  
  

  deleteFAQ(id: number): void {
    this.showDeleteModal = true;
    this.selectedFAQ.QuestionID = id;
  }

  confirmDeleteFAQ(): void {
    const headers = this.getHeaders();

    this.http.delete(`${this.baseUrl}/deleteFaqQuestion/${this.selectedFAQ.QuestionID}`, { headers })
      .subscribe(
        () => {
          this.getFAQs(); // Refresh the list after deleting
          this.closeDeleteModal();
        },
        (error) => {
          console.error('Error deleting FAQ:', error.message); // Log the error message
          alert('Failed to delete FAQ. Please check the console for more details.');
        }
      );
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  cancelEdit(): void {
    this.showEditModal = false;
  }
}
