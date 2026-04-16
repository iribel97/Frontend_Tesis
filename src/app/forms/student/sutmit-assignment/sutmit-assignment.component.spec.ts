import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SutmitAssignmentComponent } from './sutmit-assignment.component';

describe('SutmitAssignmentComponent', () => {
  let component: SutmitAssignmentComponent;
  let fixture: ComponentFixture<SutmitAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SutmitAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SutmitAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
