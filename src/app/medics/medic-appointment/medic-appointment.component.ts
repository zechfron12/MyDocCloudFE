import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject, BehaviorSubject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DoctorService } from 'src/shared/services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/shared/services/patient.service';
import { Appointment, MyCalendarEvent } from 'src/models/appointment';
import { AppointmentsService } from 'src/shared/services/appointments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/models/patient';
import * as moment from 'moment';
import { colors } from 'src/environments/global';
import { GapiService } from 'src/app/gapi-service/gapi.service';

@Component({
  selector: 'app-medic-appointment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./medic-appointment.component.css'],
  templateUrl: './medic-appointment.component.html',
})
export class MedicAppointmentComponent implements OnInit {
  doctorId: string = '';

  currentPatient: Patient = {} as Patient;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  currentDate: Date = new Date();

  appointmentModel: Appointment = {
    id: '',
    doctorId: '',
    patientId: '',
    startTime: moment(this.currentDate).add(1, 'd').add(10, 'm').toISOString(),
    endTime: moment(this.currentDate).add(1, 'd').add(20, 'm').toISOString(),
  };

  modalData:
    | {
        action: string;
        event: CalendarEvent;
      }
    | undefined;

  refresh = new Subject<void>();

  defaultEvents: MyCalendarEvent[] = [];

  events$: BehaviorSubject<MyCalendarEvent[]> = new BehaviorSubject<
    MyCalendarEvent[]
  >([]);
  patientEvents$: BehaviorSubject<MyCalendarEvent[]> = new BehaviorSubject<
    MyCalendarEvent[]
  >([]);

  activeDayIsOpen: boolean = true;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private gapi: GapiService
  ) {
    this.events$.subscribe((events) => {
      const filteredEvents = events.filter(
        (event) => event.patientId === this.appointmentModel.patientId
      );

      filteredEvents.forEach((event) => {
        event.color = { ...colors['yellow'] };
      });

      this.patientEvents$.next(filteredEvents);
    });
  }

  ngOnInit(): void {
    this.patientService.currentPatient$.subscribe((patient) => {
      this.appointmentModel.patientId = patient.id;
      this.currentPatient = patient;
    });

    this.route.parent?.params.subscribe((params) => {
      this.doctorId = params['id'];
      this.appointmentModel.doctorId = params['id'];
    });
    this.doctorService.getAppointments(this.doctorId).subscribe({
      next: (appointments) => {
        appointments.forEach((appointment, index) => {
          const newEvents = this.events$.getValue();
          newEvents.push({
            id: appointment.id,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
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
          this.events$.next(newEvents);
        });
      },
      error: (error) => console.log(error),
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events$.next(
      this.events$.getValue().map((iEvent) => {
        if (iEvent === event) {
          return {
            ...(event as MyCalendarEvent),
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      })
    );
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action);
  }

  addAppointment(): void {
    ////////////// EMAIL ///////////////
    

    // email object

    // sender is the logged user
    const email = {
      to: "PLACEHOLDER: test@test.com", // receiver
      subject: "PLACEHOLDER: [EMAIL SUBJECT]",
      body: "PLACEHOLDER [EMAIL BODY]"
    };


    // request
    this.gapi.sendEmail(email).then((response: any) => {
      console.log('Email sent:', response);
    }).catch((error: any) => {
      console.error('Error sending email:', error);
    });

    ////////////// EMAIL ///////////////

    this.doctorService
      .postAppointment(
        this.doctorId,
        this.patientService.currentPatient$.getValue().id,
        this.appointmentModel.startTime,
        this.appointmentModel.endTime
      )
      .subscribe({
        next: (result) => {
          this.events$.next([
            ...this.events$.getValue(),
            {
              title: 'Appointment',
              start: new Date(this.appointmentModel.startTime),
              end: new Date(this.appointmentModel.endTime),
              color: colors['purple'],
              draggable: true,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
            },
          ]);
        },
        error: (error) => {
          this.snackBar.open('There is an error!', 'Confirm', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
        complete: () => {
          this.appointmentModel = {
            id: '',
            doctorId: '',
            patientId: '',
            startTime: moment(this.currentDate)
              .add(1, 'd')
              .add(10, 'm')
              .toISOString(),
            endTime: moment(this.currentDate)
              .add(1, 'd')
              .add(20, 'm')
              .toISOString(),
          };
        },
      });
  }

  deleteEvent(eventToDelete: MyCalendarEvent) {
    this.events$.next(
      this.events$.getValue().filter((event) => event !== eventToDelete)
    );
    this.appointmentService.delete(eventToDelete.id || '');
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
