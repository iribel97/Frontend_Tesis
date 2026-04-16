import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtimelineComponent } from './viewtimeline.component';

describe('ViewtimelineComponent', () => {
  let component: ViewtimelineComponent;
  let fixture: ComponentFixture<ViewtimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewtimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewtimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
