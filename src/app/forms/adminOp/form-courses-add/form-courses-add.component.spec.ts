import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoursesAddComponent } from './form-courses-add.component';

describe('FormCoursesAddComponent', () => {
  let component: FormCoursesAddComponent;
  let fixture: ComponentFixture<FormCoursesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCoursesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCoursesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
