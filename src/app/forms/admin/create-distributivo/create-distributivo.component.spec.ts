import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDistributivoComponent } from './create-distributivo.component';

describe('CreateDistributivoComponent', () => {
  let component: CreateDistributivoComponent;
  let fixture: ComponentFixture<CreateDistributivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDistributivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDistributivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
