import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from 'src/models/patient';
import AbstractRestService from '../abstracts/AbstractRestService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends AbstractRestService<Patient> {
  currentPatient$ = new BehaviorSubject<Patient>({} as Patient);
  constructor(private http: HttpClient) {
    super(
      http,
      environment.BASE_API_URL + 'Patients',
      new BehaviorSubject<Patient[]>([])
    );
    this.currentPatient$.next(this.getPatientFromLocalStorage());

    this.currentPatient$.subscribe((patient) => {
      localStorage.setItem('patient', JSON.stringify(patient));
    });
  }

  getPatientFromLocalStorage() {
    try {
      const parsedJSON = JSON.parse(localStorage.getItem('patient') || '');
      return parsedJSON as Patient;
    } catch (error) {
      return {} as Patient;
    }
  }

  public addPatient(patient: Patient) {
    return this.http.post<Patient>(environment.BASE_API_URL + 'Patients', patient);
  }
}
