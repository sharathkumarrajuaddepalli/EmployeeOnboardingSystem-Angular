import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RolebasedguardService } from '../role-based-guard.service';

describe('RolebasedguardService', () => {
  let service: RolebasedguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
    });
    service = TestBed.inject(RolebasedguardService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
