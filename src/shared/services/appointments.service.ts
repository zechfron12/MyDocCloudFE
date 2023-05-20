import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from 'src/models/appointment';
import AbstractRestService from '../abstracts/AbstractRestService';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService extends AbstractRestService<Appointment> {
  constructor(private http: HttpClient) {
    super(
      http,
      environment.BASE_API_URL + 'Appointments',
      new BehaviorSubject<Appointment[]>([])
    );
  }
}
