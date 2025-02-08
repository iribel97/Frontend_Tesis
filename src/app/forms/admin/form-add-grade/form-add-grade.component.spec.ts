import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddGradeComponent } from './form-add-grade.component';

describe('FormAddGradeComponent', () => {
  let component: FormAddGradeComponent;
  let fixture: ComponentFixture<FormAddGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddGradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
