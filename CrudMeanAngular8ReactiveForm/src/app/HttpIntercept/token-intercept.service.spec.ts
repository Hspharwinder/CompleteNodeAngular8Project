import { TestBed } from '@angular/core/testing';

import { TokenInterceptService } from './token-intercept.service';

describe('TokenInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenInterceptService = TestBed.get(TokenInterceptService);
    expect(service).toBeTruthy();
  });
});
