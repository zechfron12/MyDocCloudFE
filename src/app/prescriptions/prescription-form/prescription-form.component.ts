import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GapiService } from 'src/app/gapi-service/gapi.service';
import { Doctor } from 'src/models/doctor';
import { Medication, MedicationDosages } from 'src/models/medication';
import { Patient } from 'src/models/patient';
import { Prescription } from 'src/models/prescription';
import { DoctorService } from 'src/shared/services/doctor.service';
import { MedicationService } from 'src/shared/services/medication.service';
import { PrescriptionService } from 'src/shared/services/prescription.service';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css'],
})
export class PrescriptionFormComponent implements OnInit {
  @Input() medications: Medication[] = [];
  @Input() patients: Patient[] = [];

  currentDoctor: Doctor = {} as Doctor;

  patientControl = new FormControl<Patient | null>(null, Validators.required);
  prescriptionForms = [this.generatePrescriptionForm()];

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private doctorService: DoctorService,
    private gapi: GapiService,
    private medicationService: MedicationService
  ) {}

  ngOnInit() {
    this.doctorService.currentDoctor$.subscribe(
      (currentDoctor) => (this.currentDoctor = currentDoctor)
    );
  }

  onSubmit(): void {
    const medicationDosages: MedicationDosages[] = [];
    this.prescriptionForms.forEach((prescritionForm) => {
      prescritionForm.updateValueAndValidity();
      if (prescritionForm.valid) {
        const formValues = prescritionForm.getRawValue();
        const dosage: MedicationDosages = {
          medicationId: formValues.medication || ' ',
          startDate:
            formValues.start?.toISOString() || new Date().toISOString(),
          endDate: formValues.end?.toISOString() || new Date().toISOString(),
          quantity: formValues.quantity || 0,
          frequency: formValues.frequency || 0,
        };
        medicationDosages.push(dosage);
      }
    });

    const prescription: Prescription = {
      doctorId: this.currentDoctor.id,
      patientId: this.patientControl.getRawValue()?.id || ' ',
      medicationDosages: medicationDosages,
    };

    this.prescriptionService.post(prescription);
    let patEmail = this.patientControl.getRawValue()?.email;
    this.sendEmailWithPrescriptions(patEmail, prescription);
  }

  sendEmailWithPrescriptions(patientEmail: any, prescription: Prescription) {
    let subj = '[MY DOC APP] YOUR PRESCRIPTIONS';
    let body = `Hi, here are your recommended prescriptions:  
    
    // TO DO: map prescription DATA

    DOCTOR: ${this.currentDoctor.lastName + ' ' + this.currentDoctor.firstName}
    PROFESSION: ${this.currentDoctor.profession}
    SPECIALIZATION: ${this.currentDoctor.specialization}
    TITLE: ${this.currentDoctor.title}
    LOCATION: ${this.currentDoctor.location}
    PHONE: ${this.currentDoctor.phone}
    `;

    const email = {
      to: patientEmail,
      subject: subj,
      body: body,
    };

    this.gapi
      .sendEmail(email)
      .then((response: any) => {
        console.log('Email sent:', response);
      })
      .catch((error: any) => {
        console.error('Error sending email:', error);
      });
  }

  generatePrescriptionForm() {
    return this.fb.group({
      medication: ['', Validators.required],
      start: [new Date(), Validators.required],
      end: [new Date(), Validators.required],
      quantity: [null, Validators.required],
      frequency: [null, Validators.required],
    });
  }

  addForm() {
    this.prescriptionForms.push(this.generatePrescriptionForm());
  }
}
