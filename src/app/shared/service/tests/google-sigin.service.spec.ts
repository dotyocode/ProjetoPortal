import { TestBed } from '@angular/core/testing';

import { GoogleSiginService } from '../google-sigin.service';

describe('GoogleSiginService', () => {
  let service: GoogleSiginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleSiginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
