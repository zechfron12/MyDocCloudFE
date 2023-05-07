import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Medication } from 'src/models/medication';

@Component({
  selector: 'app-medication-form',
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.css'],
})
export class MedicationFormComponent implements OnChanges {
  @Input() medication: Medication = {} as Medication;
  @Input() title: string = '';
  @Output() submitEmitter = new EventEmitter<Medication>();
  medicationForm = this.fb.group<Medication>({
    id: '',
    name: '',
    capacity: 0,
    unit: '',
    stock: 0,
    price: 0,
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: any) {
    this.medicationForm.setValue(changes.medication.currentValue);
  }

  onSubmit(): void {
    const formValues =
      this.medicationForm.getRawValue() as unknown as Medication;
    this.submitEmitter.emit(formValues);
  }
}
