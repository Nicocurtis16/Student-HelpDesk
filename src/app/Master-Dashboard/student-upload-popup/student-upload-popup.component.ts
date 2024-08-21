import { Component } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-upload-popup',
  templateUrl: './student-upload-popup.component.html',
  styleUrls: ['./student-upload-popup.component.css']
})
export class StudentUploadPopupComponent {
  isVisible = false;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  showPopup(): void {
    this.isVisible = true;
  }

  closePopup(): void {
    this.isVisible = false;
  }

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.readExcelFile(file);
    }
  }

  async readExcelFile(file: File): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const buffer = e.target.result;
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];
      const studentDataArray: any[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {  // Assuming the first row is the header
          const rowValues = row.values as Array<string>;
          studentDataArray.push({
            username: rowValues[1],  // Assuming 1st column for username
            email: rowValues[2],     // Assuming 2nd column for email
            phone_number: rowValues[3], // Assuming 3rd column for phone
            department: rowValues[4], // Assuming 4th column for department
            index_number: rowValues[5] // Assuming 5th column for index number
          });
        }
      });

      console.log(studentDataArray);
      this.uploadStudents(studentDataArray);
    };

    reader.readAsArrayBuffer(file);
  }

  uploadStudents(studentDataArray: any[]): void {
    studentDataArray.forEach(studentData => {
      const student = {
        username: studentData['username'],
        email: studentData['email'],
        password: 'defaultPassword', // Set a default or generated password
        phone_number: studentData['phone_number'],
        index_number: studentData['index_number'],
        department: studentData['department'],
        role: 'Student'
      };

      this.http.post('http://godinberto.pythonanywhere.com/api/v1/superadmin/register', student).subscribe(
        response => console.log('Student registered:', response),
        error => console.error('Failed to register student:', student.email, error)
      );
    });
  }
}
