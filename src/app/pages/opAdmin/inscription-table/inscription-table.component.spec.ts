import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionTableComponent } from './inscription-table.component';

describe('InscriptionTableComponent', () => {
  let component: InscriptionTableComponent;
  let fixture: ComponentFixture<InscriptionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
