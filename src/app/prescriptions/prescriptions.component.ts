import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/models/doctor';
import { Medication, MedicationDosages } from 'src/models/medication';
import { Patient } from 'src/models/patient';
import { Prescription } from 'src/models/prescription';
import { DoctorService } from 'src/shared/services/doctor.service';
import { MedicationService } from 'src/shared/services/medication.service';
import { PatientService } from 'src/shared/services/patient.service';
import { PrescriptionService } from 'src/shared/services/prescription.service';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
})
export class PrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = [];
  medications: Medication[] = [];
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  prescriptionForm = this.fb.group({
    patient: this.fb.control({} as Patient, {
      validators: Validators.required,
    }),
  });
  constructor(
    public fb: FormBuilder,
    public medicationService: MedicationService,
    private prescriptionService: PrescriptionService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.prescriptionService.collection$.subscribe((prescriptions) => {
      this.prescriptions = prescriptions;
      prescriptions.forEach((prescption) => {
        this.doctors.push(
          this.doctorService.getOne(prescption.doctorId) || ({} as Doctor)
        );
      });
      this.patientService.collection$.subscribe(
        (patients) => (this.patients = patients)
      );

      this.medicationService.collection$.subscribe(
        (medications) => (this.medications = medications)
      );
    });
  }

  getDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB');
  }

  addToCart(prescription: Prescription) {
    const dosages = prescription.medicationDosagePrescriptions;
    dosages?.forEach((dosage) => {
      const medication = this.medicationService.getOne(dosage.medicationId);
      for (let index = 0; index < dosage.quantity; index++)
        this.shoppingCartService.addToCard(medication || ({} as Medication));
    });

    this.prescriptionService.addToDelede(prescription);
  }
}
