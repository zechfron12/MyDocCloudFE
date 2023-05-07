import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from 'src/shared/services/doctor.service';

@Component({
  selector: 'app-medic-form',
  templateUrl: './medic-form.component.html',
  styleUrls: ['./medic-form.component.css'],
})
export class MedicFormComponent implements OnChanges {
  @Input() doctor: Doctor = {} as Doctor;
  @Input() title: string = '';
  @Output() submitEmitter = new EventEmitter<Doctor>();

  medicForm = this.fb.group<Doctor>({
    id: '',
    title: '',
    profession: '',
    firstName: '',
    lastName: '',
    specialization: '',
    email: '',
    phone: '',
    grade: 0,
    location: '',
    reviews: 0,
  });

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {}

  ngOnChanges(changes: any) {
    this.medicForm.setValue(changes.doctor.currentValue);
  }

  onSubmit(): void {
    const formValues = this.medicForm.getRawValue() as unknown as Doctor;
    this.submitEmitter.emit(formValues);
  }
}
