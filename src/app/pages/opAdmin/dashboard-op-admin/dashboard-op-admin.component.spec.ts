import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOpAdminComponent } from './dashboard-op-admin.component';

describe('DashboardOpAdminComponent', () => {
  let component: DashboardOpAdminComponent;
  let fixture: ComponentFixture<DashboardOpAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOpAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOpAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
