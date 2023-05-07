import { Component, OnInit } from '@angular/core';
import { Medication } from 'src/models/medication';
import { MedicationService } from '../../shared/services/medication.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css'],
})
export class MedicationsComponent implements OnInit {
  drugs: Medication[] = [];

  constructor(private medicationService: MedicationService) {}

  ngOnInit() {
    this.medicationService.getAll();
    this.medicationService.collection$.subscribe((medications) => {
      this.drugs = medications;
    });
  }

  onSubmit(medication: Medication) {
    this.medicationService.post(medication);
  }

  onDelete(id: string) {
    this.medicationService.delete(id);
  }
}
