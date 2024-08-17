// <div class="w-screen h-screen flex">
//   <div class="h-[100%] w-[20%]">
//     <app-sidebar></app-sidebar>
//   </div>

//   <div class="h-[100%] w-screen">
//     <div class="h-[10%] w-[100%] mb-5">
//       <app-top-panel></app-top-panel>
//     </div>
//     <div class="h-[87%] w-[100%] flex flex-col items-center">

//       <!-- Add FAQ Button -->
//       <div class="h-[48px] w-[95%] flex items-center justify-end">
//         <button
//           class="h-10 px-5 bg-[#ec4909] rounded-lg flex justify-center items-center gap-2"
//           (click)="openAddModal()"
//         >
//           <span class="text-white text-base font-normal">Add FAQ</span>
//         </button>
//       </div>

//       <!-- Add FAQ Modal -->
//       <div *ngIf="showModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//         <div class="w-[400px] h-auto p-6 bg-white rounded-xl shadow">
//           <h3>Add FAQ</h3>
//           <p>Please fill in the forms below to add an FAQ:</p>
//           <input [(ngModel)]="faqQuestion" placeholder="Enter the question" class="mb-2 w-full p-2 border">
//           <input [(ngModel)]="faqAnswer" placeholder="Enter the answer" class="mb-2 w-full p-2 border">
//           <select [(ngModel)]="faqTopic" class="mb-2 w-full p-2 border">
//             <option *ngFor="let topic of topics" [value]="topic">{{ topic }}</option>
//           </select>
//           <button (click)="addFAQ()" class="mr-2 bg-green-500 text-white px-4 py-2 rounded">Add FAQ</button>
//           <button (click)="closeModal()" class="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
//         </div>
//       </div>

//       <!-- FAQs Table -->
//       <div class="h-[80%] w-[95%] border mt-5">
//         <div class="h-[100%] w-[100%] flex">
//           <!-- Questions Column -->
//           <div class="h-[100%] w-[30%]">
//             <table class="w-full">
//               <thead>
//                 <tr>
//                   <th>Questions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr *ngFor="let faq of faqs" (click)="editFAQ(faq)">
//                   <td>{{ faq.Question }}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <!-- Answers Column -->
//           <div class="h-[100%] w-[40%]">
//             <table class="w-full">
//               <thead>
//                 <tr>
//                   <th>Answers</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr *ngFor="let faq of faqs">
//                   <td>{{ faq.Answer }}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <!-- Topics Column -->
//           <div class="h-[100%] w-[20%]">
//             <table class="w-full">
//               <thead>
//                 <tr>
//                   <th>Topic</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr *ngFor="let faq of faqs">
//                   <td>{{ faq.Topic }}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <!-- Actions Column -->
//           <div class="h-[100%] w-[20%]">
//             <table class="w-full">
//               <thead>
//                 <tr>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr *ngFor="let faq of faqs">
//                   <td>
//                     <button (click)="editFAQ(faq)" class="mr-2 bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
//                     <button (click)="deleteFAQ(faq.QuestionID)" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// <!-- Edit FAQ Modal -->
// <div *ngIf="showEditModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//   <div class="w-[400px] h-auto p-6 bg-white rounded-xl shadow">
//     <h3>Edit FAQ</h3>
//     <input [(ngModel)]="selectedFAQ.Question" placeholder="Enter the question" class="mb-2 w-full p-2 border">
//     <input [(ngModel)]="selectedFAQ.Answer" placeholder="Enter the answer" class="mb-2 w-full p-2 border">
//     <select [(ngModel)]="selectedFAQ.Topic" class="mb-2 w-full p-2 border">
//       <option *ngFor="let topic of topics" [value]="topic">{{ topic }}</option>
//     </select>
//     <button (click)="updateFAQ()" class="mr-2 bg-green-500 text-white px-4 py-2 rounded">Save</button>
//     <button (click)="closeEditModal()" class="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
//   </div>
// </div>

// <!-- Delete Confirmation Modal -->
// <div *ngIf="showDeleteModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//   <div class="w-[400px] h-[200px] p-6 bg-white rounded-xl shadow">
//     <h3>Delete FAQ</h3>
//     <p>Are you sure you want to delete "{{ selectedFAQ.Question }}"? This action cannot be undone.</p>
//     <button (click)="confirmDeleteFAQ()" class="mr-2 bg-red-500 text-white px-4 py-2 rounded">Confirm</button>
//     <button (click)="closeDeleteModal()" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//   </div>
// </div>
