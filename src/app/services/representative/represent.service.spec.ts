import { TestBed } from '@angular/core/testing';

import { RepresentService } from './represent.service';

describe('RepresentService', () => {
  let service: RepresentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepresentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
