import { CalendarEvent } from 'angular-calendar';
import { Doctor } from './doctor';
import { Patient } from './patient';

export interface Appointment {
  id: string;
  doctorId: string;
  doctor?: Doctor;
  patientId: string;
  patient?: Patient;
  startTime: string;
  endTime: string;
}

export interface MyCalendarEvent extends CalendarEvent {
  id?: string;
  patientId?: string;
  doctorId?: string;
}
