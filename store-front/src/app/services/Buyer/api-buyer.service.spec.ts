import { TestBed } from '@angular/core/testing';

import { ApiBuyerService } from './api-buyer.service';

describe('ApiBuyerService', () => {
  let service: ApiBuyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBuyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
