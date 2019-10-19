import { TestBed } from '@angular/core/testing';

import { RestapiconfService } from './restapiconf.service';

describe('RestapiconfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestapiconfService = TestBed.get(RestapiconfService);
    expect(service).toBeTruthy();
  });
});
