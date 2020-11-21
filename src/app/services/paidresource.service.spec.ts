import { TestBed } from '@angular/core/testing';

import { PaidresourceService } from './paidresource.service';

describe('PaidresourceService', () => {
  let service: PaidresourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaidresourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
