import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MyCalendarEvent } from 'src/models/appointment';
import { AppointmentsService } from 'src/shared/services/appointments.service';
import { PatientService } from 'src/shared/services/patient.service';
import { Patient } from 'src/models/patient';
import { colors } from 'src/environments/global';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  patientEvents$: BehaviorSubject<MyCalendarEvent[]> = new BehaviorSubject<
    MyCalendarEvent[]
  >([]);
  patient: Patient = {} as Patient;

  refresh = new Subject<void>();

  constructor(
    private appointmentService: AppointmentsService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patientService.currentPatient$.subscribe(
      (patient) => (this.patient = patient)
    );
    this.appointmentService.collection$.subscribe({
      next: (appointments) => {
        appointments
          .filter((appointment) => appointment.patientId === this.patient.id)
          .forEach((appointment, index) => {
            const newEvents = this.patientEvents$.getValue();
            newEvents.push({
              id: appointment.id,
              patientId: appointment.patientId,
              doctorId: appointment.doctorId,
              callUrl: 'https://my-doc-call.web.app/room/' + appointment.id,
              start: new Date(appointment.startTime),
              end: new Date(appointment.endTime),
              title: 'Appointment' + index,
              color: { ...colors['purple'] },
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              draggable: true,
            });
            this.patientEvents$.next(newEvents);
          });
      },
      error: (error) => console.log(error),
    });
  }

  deleteEvent(eventToDelete: MyCalendarEvent) {
    this.patientEvents$.next(
      this.patientEvents$.getValue().filter((event) => event !== eventToDelete)
    );
    this.appointmentService.delete(eventToDelete.id || '');
  }

  enterCall(event: MyCalendarEvent) {}
}
