import { TestBed } from '@angular/core/testing';

import { ChatFirebaseService } from './chat-firebase.service';

describe('ChatFirebaseService', () => {
  let service: ChatFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
