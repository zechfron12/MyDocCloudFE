import { Injectable } from '@angular/core';
import AbstractRestService from '../abstracts/AbstractRestService';
import { Prescription } from 'src/models/prescription';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { MedicationDosages } from 'src/models/medication';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService extends AbstractRestService<Prescription> {
  private toBeDeleted: Prescription[] = [];
  constructor(private http: HttpClient) {
    super(
      http,
      environment.BASE_API_URL + 'Prescriptions',
      new BehaviorSubject<Prescription[]>([])
    );
  }

  getMedicationDosages(prescriptionId: string) {
    return this.http.get<MedicationDosages[]>(
      this._url + '/' + prescriptionId + '/medicationDosages'
    );
  }

  addToDelede(prescription: Prescription) {
    this.toBeDeleted.push(prescription);
  }

  deleteToBeDeletedPrescriptions() {
    this.toBeDeleted.forEach((prescription) =>
      this.delete(prescription.id || '')
    );
  }
}
