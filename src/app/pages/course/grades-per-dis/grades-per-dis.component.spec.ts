import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesPerDisComponent } from './grades-per-dis.component';

describe('GradesPerDisComponent', () => {
  let component: GradesPerDisComponent;
  let fixture: ComponentFixture<GradesPerDisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradesPerDisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesPerDisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
