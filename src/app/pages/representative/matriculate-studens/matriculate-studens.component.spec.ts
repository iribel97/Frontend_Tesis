import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculateStudensComponent } from './matriculate-studens.component';

describe('MatriculateStudensComponent', () => {
  let component: MatriculateStudensComponent;
  let fixture: ComponentFixture<MatriculateStudensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatriculateStudensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculateStudensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
