import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from 'src/models/doctor';

@Component({
  selector: 'app-medic-card',
  templateUrl: './medic-card.component.html',
  styleUrls: ['./medic-card.component.css'],
})
export class MedicCardComponent implements OnInit {
  @Input() doctor: Doctor = {} as Doctor;
  @Input() editable = false;
  @Output() delete = new EventEmitter<string>();

  profileLink: string = '';
  ngOnInit() {
    this.profileLink = '/medics/' + this.doctor.id;
  }

  onDelete(event: any) {
    this.delete.emit(this.doctor.id);
  }
}
