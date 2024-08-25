import { Component } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-upload-popup',
  templateUrl: './admin-upload-popup.component.html',
  styleUrls: ['./admin-upload-popup.component.css']
})
export class AdminUploadPopupComponent {
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
      const adminDataArray: any[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {  // Assuming the first row is the header
          const rowValues = row.values as Array<string>;
          adminDataArray.push({
            username: row[0],  // Assuming 1st column for username
          email: row[1],     // Assuming 2nd column for email
          phone_number: row[2], // Assuming 3rd column for phone
          department: row[3], // Assuming 4th column for department
          password: row[4], // Assuming 6th column for password
          role: 'Student'  // Set role to 'Student'
          });
        }
      });

      console.log(adminDataArray);
      this.uploadAdmins(adminDataArray);
    };

    reader.readAsArrayBuffer(file);
  }

  uploadAdmins(adminDataArray: any[]): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const payload = {
      users: adminDataArray
    };

    this.http.post('http://godinberto.pythonanywhere.com/api/v1/superadmin/register', payload, { headers })
      .subscribe(
        response => console.log('Admins registered:', response),
        error => console.error('Failed to register admins:', error)
      );
  }
}
