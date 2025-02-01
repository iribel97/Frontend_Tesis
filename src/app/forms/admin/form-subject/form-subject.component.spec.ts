import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubjectComponent } from './form-subject.component';

describe('FormSubjectComponent', () => {
  let component: FormSubjectComponent;
  let fixture: ComponentFixture<FormSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
