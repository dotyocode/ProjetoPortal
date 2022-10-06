import { TestBed } from '@angular/core/testing';

import { FerramentasService } from './ferramentas.service';

describe('FerramentasService', () => {
  let service: FerramentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FerramentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
