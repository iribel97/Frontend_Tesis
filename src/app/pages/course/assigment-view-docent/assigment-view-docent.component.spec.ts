import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentViewDocentComponent } from './assigment-view-docent.component';

describe('AssigmentViewDocentComponent', () => {
  let component: AssigmentViewDocentComponent;
  let fixture: ComponentFixture<AssigmentViewDocentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigmentViewDocentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigmentViewDocentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
