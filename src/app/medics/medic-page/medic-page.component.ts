import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from 'src/shared/services/doctor.service';

@Component({
  selector: 'app-medic-page',
  templateUrl: './medic-page.component.html',
  styleUrls: ['./medic-page.component.css'],
})
export class MedicPageComponent implements OnInit {
  doctor: Doctor = {} as Doctor;
  id: string = '';
  selectedDate: Date = {} as Date;
  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.doctorService.collection$.subscribe(
      (doctors) =>
        (this.doctor = doctors.find((d) => d.id == this.id) || ({} as Doctor))
    );
  }

  onFormSubmit(event: Doctor) {
    this.doctorService.update(event);
  }
}
