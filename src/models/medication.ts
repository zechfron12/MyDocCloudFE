export interface Medication {
  id: string;
  name: string;
  stock: number;
  unit: string;
  capacity: number;
  price: number;
}

export interface MedicationDosages {
  medicationId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  frequency: number;
}
