import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculateComponent } from './matriculate.component';

describe('MatriculateComponent', () => {
  let component: MatriculateComponent;
  let fixture: ComponentFixture<MatriculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatriculateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
