import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOutboxComponent } from './admin-outbox.component';

describe('AdminOutboxComponent', () => {
  let component: AdminOutboxComponent;
  let fixture: ComponentFixture<AdminOutboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminOutboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
