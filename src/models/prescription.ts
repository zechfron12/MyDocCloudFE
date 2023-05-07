import { MedicationDosages } from './medication';

export interface Prescription {
  id?: string;
  doctorId: string;
  patientId: string;
  medicationDosages?: MedicationDosages[];
  medicationDosagePrescriptions?: MedicationDosages[];
}
