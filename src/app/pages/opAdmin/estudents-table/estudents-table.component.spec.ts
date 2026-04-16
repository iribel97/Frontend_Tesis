import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentsTableComponent } from './estudents-table.component';

describe('EstudentsTableComponent', () => {
  let component: EstudentsTableComponent;
  let fixture: ComponentFixture<EstudentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
