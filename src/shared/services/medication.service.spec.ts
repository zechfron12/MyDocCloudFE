import { TestBed } from '@angular/core/testing';

import { MedicationService } from './medication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MedicationService', () => {
  let service: MedicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MedicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
