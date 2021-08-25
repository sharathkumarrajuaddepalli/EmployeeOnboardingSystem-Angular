import { TestBed } from '@angular/core/testing';

import { RouteDeactivationGuardService } from '../route-deactivation-guard.service';

describe('RouteDeactivationGuardService', () => {
  let service: RouteDeactivationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteDeactivationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
