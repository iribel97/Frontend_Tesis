import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsEstudentComponent } from './inscriptions-estudent.component';

describe('InscriptionsEstudentComponent', () => {
  let component: InscriptionsEstudentComponent;
  let fixture: ComponentFixture<InscriptionsEstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionsEstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionsEstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
