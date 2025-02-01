import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRepresentativeComponent } from './dashboard-representative.component';

describe('DashboardRepresentativeComponent', () => {
  let component: DashboardRepresentativeComponent;
  let fixture: ComponentFixture<DashboardRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
