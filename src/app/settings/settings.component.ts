import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Doctor } from 'src/models/doctor';
import { Patient } from 'src/models/patient';
import { DoctorService } from 'src/shared/services/doctor.service';
import { PatientService } from 'src/shared/services/patient.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  patientControl = new FormControl<Patient | null>(null, Validators.required);
  doctorControl = new FormControl<Doctor | null>(null, Validators.required);

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.patientService.collection$.subscribe((patients) => {
      this.patients = patients;
    });

    this.patientControl.setValue(
      this.patientService.currentPatient$.getValue()
    );

    this.patientControl.valueChanges.subscribe((value) => {
      this.patientService.currentPatient$.next(value || ({} as Patient));
    });

    this.doctorService.collection$.subscribe((doctors) => {
      this.doctors = doctors;
    });

    this.doctorControl.setValue(this.doctorService.currentDoctor$.getValue());

    this.doctorControl.valueChanges.subscribe((value) => {
      this.doctorService.currentDoctor$.next(value || ({} as Doctor));
    });
  }
}
