import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgraundComponent } from './backgraund.component';

describe('BackgraundComponent', () => {
  let component: BackgraundComponent;
  let fixture: ComponentFixture<BackgraundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgraundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgraundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
