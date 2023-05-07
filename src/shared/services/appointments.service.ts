import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_API_URL } from 'src/environments/global';
import { Appointment } from 'src/models/appointment';
import AbstractRestService from '../abstracts/AbstractRestService';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService extends AbstractRestService<Appointment> {
  constructor(private http: HttpClient) {
    super(
      http,
      BASE_API_URL + 'Appointments',
      new BehaviorSubject<Appointment[]>([])
    );
  }
}
