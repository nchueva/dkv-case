import { TestBed } from '@angular/core/testing';

import { VehiclesApiService } from './vehicles-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('VehiclesApiService', () => {
  let service: VehiclesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VehiclesApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(VehiclesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
