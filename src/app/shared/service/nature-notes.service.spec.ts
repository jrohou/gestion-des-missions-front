import { TestBed, inject } from '@angular/core/testing';

import { NatureNotesService } from './nature-notes.service';

describe('NatureNotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NatureNotesService]
    });
  });

  it('should be created', inject([NatureNotesService], (service: NatureNotesService) => {
    expect(service).toBeTruthy();
  }));
});
