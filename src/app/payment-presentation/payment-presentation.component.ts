import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Medication } from 'src/models/medication';
import { OrderStatusResponse } from 'src/models/payment';
import { BillService } from 'src/shared/services/bill.service';
import { PaymentService } from 'src/shared/services/payment.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment-presentation',
  templateUrl: './payment-presentation.component.html',
  styleUrls: ['./payment-presentation.component.css'],
})
export class PaymentPresentationComponent implements OnInit {
  response: OrderStatusResponse = {} as OrderStatusResponse;
  medications: Medication[] = [];
  billId = '';

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private billService: BillService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.billId = params.get('billId') || '';
      const status = params.get('status') || '';
      if (status !== 'succeed')
        this.snackBar.open('The payment did not succeed', 'Ok!', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      else {
        this.billService.postPayment(this.billId, {
          orderStatus: 1,
          cardHolderName: this.userService.getUserData().displayName || ' ',
        });
      }
    });

    this.billService
      .getMedications(this.billId)
      .subscribe((medications) => (this.medications = medications));
  }
}
