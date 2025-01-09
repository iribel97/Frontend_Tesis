import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAdComponent } from './courses-ad.component';

describe('CoursesAdComponent', () => {
  let component: CoursesAdComponent;
  let fixture: ComponentFixture<CoursesAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
