import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationTeacherComponent } from './citation-teacher.component';

describe('CitationTeacherComponent', () => {
  let component: CitationTeacherComponent;
  let fixture: ComponentFixture<CitationTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitationTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitationTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
