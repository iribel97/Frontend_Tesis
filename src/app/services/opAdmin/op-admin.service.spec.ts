import { TestBed } from '@angular/core/testing';

import { OpAdminService } from './op-admin.service';

describe('OpAdminService', () => {
  let service: OpAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
