import { Component, OnInit } from '@angular/core';
import { Medication } from 'src/models/medication';
import { BillPayment } from 'src/models/payment';
import { BillService } from 'src/shared/services/bill.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  billsObject: {
    index: number;
    medications: Medication[];
    bill: BillPayment;
  }[] = [];
  constructor(private billService: BillService) {}

  ngOnInit() {
    this.billService.collection$.subscribe((bills) => {
      bills.forEach((bill, index) => {
        this.billService
          .getMedications(bill.id || '')
          .subscribe((medications) => {
            this.billsObject.push({ index, medications, bill });
          });
      });
    });
  }
}
