import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { CountryStateDataService } from '../country-state-data.service';

describe('CountryStateDataService', () => {
  let service: CountryStateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(CountryStateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
