import { Component } from '@angular/core';
import { DoctorService } from 'src/shared/services/doctor.service';
import { MedicationService } from 'src/shared/services/medication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MyDocAppointment';

  constructor(
    private doctorService: DoctorService,
    private medicationService: MedicationService
  ) {
    this.doctorService.getAll();
    this.medicationService.getAll();
  }
}
