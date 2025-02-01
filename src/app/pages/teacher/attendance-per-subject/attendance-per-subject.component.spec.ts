import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePerSubjectComponent } from './attendance-per-subject.component';

describe('AttendancePerSubjectComponent', () => {
  let component: AttendancePerSubjectComponent;
  let fixture: ComponentFixture<AttendancePerSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendancePerSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendancePerSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
