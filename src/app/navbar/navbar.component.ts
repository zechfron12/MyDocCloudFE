import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GoogleAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';
import { UserService } from '../user.service';
import { GapiService } from '../gapi-service/gapi.service';
import { PatientService } from 'src/shared/services/patient.service';
import { Patient } from 'src/models/patient';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  cartSize: number = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    private gapi: GapiService,
    private patientService: PatientService
  ) { }

  public user: any;
  public currentPatient: Patient[];

  async ngOnInit() {
    this.shoppingCartService.$totalCount.subscribe(
      (count) => (this.cartSize = count)
    );

    this.user = this.userService.getUserData();
  }

  async signInWithGoogle() {
    await this.gapi.signIn();
    this.user = await this.gapi.getUserProfile();
    this.user.role = this.gapi.getUserRole(this.user.email);
    this.userService.setUserData(this.user);
    
    if (this.user.role == "PATIENT") {

      if (!this.isExistingPacient()) {
        let patient = {} as Patient;

        let name = this.user.displayName.split(" ");

        patient.firstName = name[0];
        patient.lastName = name[1];
        patient.email = this.user.email;
        patient.phone = "1234";

        this.patientService.addPatient(patient).subscribe((res) => {
          this.patientService.currentPatient$.next(patient);
        })
      } else {
        const currentPatient = this.patientService.collection$.getValue().find((p) => p.email === this.user.email) as Patient;
        this.patientService.currentPatient$.next(currentPatient);
      }



    }
  }

  async signOutWithGoogle() {
    await this.gapi.signOut();
    this.user = null;
    this.userService.removeUserData();
  }

  private isExistingPacient() {
    let isExistingPatient = false;

    this.patientService.collection$.subscribe({
      next: (pats) => {
        isExistingPatient = pats.some((p) => p.email === this.user.email);
      },
      error: (error) => {
        console.error(error);
      },
    });
    return isExistingPatient;
  }

}
