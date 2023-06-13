import { TestBed } from '@angular/core/testing';

import { ApiSellerService } from './api-seller.service';

describe('ApiSellerService', () => {
  let service: ApiSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
