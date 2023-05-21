import { Component } from '@angular/core';
import { DoctorService } from 'src/shared/services/doctor.service';
import { MedicationService } from 'src/shared/services/medication.service';
import { signInWithCredential, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, getAuth, User } from "firebase/auth";
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MyDocAppointment';

  constructor(
    private doctorService: DoctorService,
    private medicationService: MedicationService,
    private userService: UserService
  ) {
    this.doctorService.getAll();
    this.medicationService.getAll();
  }

  async ngOnInit() {
    const auth = getAuth();

    auth.onAuthStateChanged(async (user) => {
      this.userService.setUserData(user);
    })
  }

}
