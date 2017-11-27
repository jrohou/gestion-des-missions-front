import { TestBed, inject } from '@angular/core/testing';

import { GoogleMapApiService } from './google-map-api.service';

describe('GoogleMapApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapApiService]
    });
  });

  it('should be created', inject([GoogleMapApiService], (service: GoogleMapApiService) => {
    expect(service).toBeTruthy();
  }));
});
