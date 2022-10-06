import { TestBed } from '@angular/core/testing';

import { AuthloginGuard } from './authlogin.guard';

describe('AuthloginGuard', () => {
  let guard: AuthloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
