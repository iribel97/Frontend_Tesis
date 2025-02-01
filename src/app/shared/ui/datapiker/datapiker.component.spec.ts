import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatapikerComponent } from './datapiker.component';

describe('DatapikerComponent', () => {
  let component: DatapikerComponent;
  let fixture: ComponentFixture<DatapikerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatapikerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatapikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
