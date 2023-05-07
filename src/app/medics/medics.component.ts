import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from '../../shared/services/doctor.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css'],
})
export class MedicsComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(public doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.collection$.subscribe({
      next: (response) => {
        this.doctors = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onDelete(id: string) {
    this.doctorService.delete(id);
  }

  onSubmit(event: Doctor) {
    this.doctorService.post(event);
  }
}
