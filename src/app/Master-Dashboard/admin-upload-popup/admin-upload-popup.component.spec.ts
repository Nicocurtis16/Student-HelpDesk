import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadPopupComponent } from './admin-upload-popup.component';

describe('AdminUploadPopupComponent', () => {
  let component: AdminUploadPopupComponent;
  let fixture: ComponentFixture<AdminUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUploadPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
