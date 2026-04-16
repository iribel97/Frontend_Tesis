import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAcademicCalendarComponent } from './form-academic-calendar.component';

describe('FormAcademicCalendarComponent', () => {
  let component: FormAcademicCalendarComponent;
  let fixture: ComponentFixture<FormAcademicCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAcademicCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAcademicCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
