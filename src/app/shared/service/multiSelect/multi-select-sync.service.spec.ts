import { TestBed } from '@angular/core/testing';

import { MultiSelectSyncService } from './multi-select-sync.service';

describe('MultiSelectSyncService', () => {
  let service: MultiSelectSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiSelectSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
