import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributiveComponent } from './distributive.component';

describe('DistributiveComponent', () => {
  let component: DistributiveComponent;
  let fixture: ComponentFixture<DistributiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
