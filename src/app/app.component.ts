import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/shared/services/doctor.service';
import { MedicationService } from 'src/shared/services/medication.service';
import {
  signInWithCredential,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  getAuth,
  User,
} from 'firebase/auth';
import { UserService } from './user.service';
import { GapiService } from './gapi-service/gapi.service';
import { Subscription, debounce, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MyDocAppointment';
  isPatient: boolean = false;

  constructor(
    private medicationService: MedicationService,
    private doctorService: DoctorService,
    private UserService: UserService
  ) {
    this.medicationService.getAll();
    this.doctorService.getAll();
  }

  ngOnInit(): void {
    this.UserService.getRole();
    if (this.UserService.getRole() == 'PATIENT') {
      this.isPatient = true;
    }
  }
}
