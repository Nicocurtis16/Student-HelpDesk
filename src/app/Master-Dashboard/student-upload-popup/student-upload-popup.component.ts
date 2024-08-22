import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
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
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const studentDataArray: any[] = [];

      // Skip header row
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        studentDataArray.push({
          username: row[0],  // Assuming 1st column for username
          email: row[1],     // Assuming 2nd column for email
          phone_number: row[2], // Assuming 3rd column for phone
          department: row[3], // Assuming 4th column for department
          index_number: row[4] // Assuming 5th column for index number
        });
      }

      console.log(studentDataArray);
      this.uploadStudents(studentDataArray);
    };

    reader.readAsBinaryString(file);
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
