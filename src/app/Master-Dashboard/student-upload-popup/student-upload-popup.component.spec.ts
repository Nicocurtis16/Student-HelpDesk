import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUploadPopupComponent } from './student-upload-popup.component';

describe('StudentUploadPopupComponent', () => {
  let component: StudentUploadPopupComponent;
  let fixture: ComponentFixture<StudentUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentUploadPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
