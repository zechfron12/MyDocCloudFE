import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/models/doctor';
import { Medication } from 'src/models/medication';
import { DoctorService } from '../../shared/services/doctor.service';
import { MedicationService } from '../../shared/services/medication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  doctors: Doctor[] = [];

  drugs: Medication[] = [];

  constructor(
    private doctorService: DoctorService,
    private medicationService: MedicationService
  ) {}

  ngOnInit() {
    this.doctorService.collection$.subscribe(
      (result) => (this.doctors = this.getRandomFromArray(result, 5))
    );
    this.medicationService.collection$.subscribe(
      (result) => (this.drugs = this.getRandomFromArray(result, 3))
    );
  }

  getRandomFromArray(array: any[], n: number): any[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, n);
  }
}
