import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsotipoComponent } from './isotipo.component';

describe('IsotipoComponent', () => {
  let component: IsotipoComponent;
  let fixture: ComponentFixture<IsotipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsotipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsotipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
