import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from 'src/shared/services/doctor.service';

@Component({
  selector: 'app-medic-profile',
  templateUrl: './medic-profile.component.html',
  styleUrls: ['./medic-profile.component.css'],
})
export class MedicProfileComponent implements OnInit {
  doctor: Doctor = {} as Doctor;
  id: string = '';
  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.doctorService.collection$.subscribe(
      (doctors) =>
        (this.doctor = doctors.find((d) => d.id == this.id) || ({} as Doctor))
    );
  }
}
