import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangPassComponent } from './form-chang-pass.component';

describe('FormChangPassComponent', () => {
  let component: FormChangPassComponent;
  let fixture: ComponentFixture<FormChangPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormChangPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChangPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
