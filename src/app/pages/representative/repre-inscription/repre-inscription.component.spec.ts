import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreInscriptionComponent } from './repre-inscription.component';

describe('RepreInscriptionComponent', () => {
  let component: RepreInscriptionComponent;
  let fixture: ComponentFixture<RepreInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepreInscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
