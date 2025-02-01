import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddGradingSystemComponent } from './form-add-grading-system.component';

describe('FormAddGradingSystemComponent', () => {
  let component: FormAddGradingSystemComponent;
  let fixture: ComponentFixture<FormAddGradingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddGradingSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddGradingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
