import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddScheduleComponent } from './form-add-schedule.component';

describe('FormAddScheduleComponent', () => {
  let component: FormAddScheduleComponent;
  let fixture: ComponentFixture<FormAddScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
