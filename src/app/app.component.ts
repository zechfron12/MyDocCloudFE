import { Component } from '@angular/core';
import { DoctorService } from 'src/shared/services/doctor.service';
import { MedicationService } from 'src/shared/services/medication.service';
import { signInWithCredential, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, getAuth, User } from "firebase/auth";
import { UserService } from './user.service';
import { GapiService } from './gapi-service/gapi.service';
import { Subscription, debounce, interval } from 'rxjs';

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
    private userService: UserService,
    private gapi: GapiService
  ) {
    this.doctorService.getAll();
    this.medicationService.getAll();
    async () => {

      console.log(await this.gapi.isSignedIn());
    }
  }
  private obs: Subscription = new Subscription();
  async ngOnInit() {
    // const auth = getAuth();

    // auth.onAuthStateChanged(async (user) => {
    //   this.userService.setUserData(user, null);
    // })

    // const isAuth = await this.gapi.isSignedIn();
    // console.log(isAuth)
  }

  // signIn() {
  //   this.gmailService.signIn().then(() => {
  //     console.log('Signed in successfully!');
  //   }).catch((error: any) => {
  //     console.error('Error signing in:', error);
  //   });
  // }

  // signOut() {
  //   this.gmailService.signOut().then(() => {
  //     console.log('Signed out successfully!');
  //   }).catch((error: any) => {
  //     console.error('Error signing out:', error);
  //   });
  // }

  // sendEmail() {
  //   const email = {
  //     to: 'catalin.11.munteanu@gmail.com',
  //     subject: 'Subject of the email',
  //     body: 'Email body here'
  //   };

  //   this.gmailService.sendEmail(email).then((response: any) => {
  //     console.log('Email sent:', response);
  //   }).catch((error: any) => {
  //     console.error('Error sending email:', error);
  //   });
  // }

}
