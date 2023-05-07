import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_API_URL } from 'src/environments/global';
import { Appointment } from 'src/models/appointment';
import { Doctor } from 'src/models/doctor';
import AbstractRestService from '../abstracts/AbstractRestService';

@Injectable({
  providedIn: 'root',
})
export class DoctorService extends AbstractRestService<Doctor> {
  currentDoctor$ = new BehaviorSubject<Doctor>({} as Doctor);
  constructor(private http: HttpClient) {
    super(http, BASE_API_URL + 'Doctors', new BehaviorSubject<Doctor[]>([]));
    this.currentDoctor$.next(this.getDoctorFromLocalStorage());

    this.currentDoctor$.subscribe((doctor) => {
      localStorage.setItem('doctor', JSON.stringify(doctor));
    });
  }

  getDoctorFromLocalStorage() {
    try {
      const parsedJSON = JSON.parse(localStorage.getItem('doctor') || '');
      return parsedJSON as Doctor;
    } catch (error) {
      return {} as Doctor;
    }
  }

  getAppointments(doctorId: string) {
    return this.http.get<Appointment[]>(
      this._url + '/' + doctorId + '/appointments'
    );
  }

  postAppointment(doctorId: string, appointment: Appointment) {
    return this.http.post<Appointment>(
      this._url + '/' + doctorId + '/appointments',
      [
        {
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          patientId: appointment.patientId,
          doctorId: doctorId,
        },
      ]
    );
  }
}
