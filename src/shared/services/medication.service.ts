import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Medication } from 'src/models/medication';
import AbstractRestService from '../abstracts/AbstractRestService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicationService extends AbstractRestService<Medication> {
  constructor(private http: HttpClient) {
    super(
      http,
      environment.BASE_API_URL + 'Medications',
      new BehaviorSubject<Medication[]>([])
    );
  }
}
