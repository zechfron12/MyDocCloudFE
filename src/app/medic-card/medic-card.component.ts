import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from 'src/models/doctor';
import { UserService } from '../user.service';

@Component({
  selector: 'app-medic-card',
  templateUrl: './medic-card.component.html',
  styleUrls: ['./medic-card.component.css'],
})
export class MedicCardComponent implements OnInit {
  @Input() doctor: Doctor = {} as Doctor;
  @Input() editable = false;
  @Output() delete = new EventEmitter<string>();

  isDoctor: boolean = false;
  profileLink: string = '';

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.profileLink = '/medics/' + this.doctor.id;
    this.isDoctor = this.userService.getRole() == 'DOCTOR';
  }

  onDelete(event: any) {
    this.delete.emit(this.doctor.id);
  }
}
