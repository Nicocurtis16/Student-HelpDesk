import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize forms
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      profilePicture: [null]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Password matching validator
  passwordMatchValidator(frm: FormGroup): void {
    const newPassword = frm.get('newPassword')?.value;
    const confirmPassword = frm.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      frm.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      frm.get('confirmPassword')?.setErrors(null);
    }
  }

  // Handle profile form submission
  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Profile updated:', this.profileForm.value);
    }
  }

  // Handle password form submission
  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      console.log('Password changed:', this.passwordForm.value);
    }
  }

  // Handle file change for profile picture
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({
        profilePicture: file
      });
    }
  }
}
