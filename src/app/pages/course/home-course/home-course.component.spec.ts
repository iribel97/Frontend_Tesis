import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCourseComponent } from './home-course.component';

describe('HomeCourseComponent', () => {
  let component: HomeCourseComponent;
  let fixture: ComponentFixture<HomeCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
