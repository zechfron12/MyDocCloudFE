import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Medication } from 'src/models/medication';
import { OrderStatusResponse } from 'src/models/payment';
import { BillService } from 'src/shared/services/bill.service';
import { PaymentService } from 'src/shared/services/payment.service';

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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.billId = params.get('billId') || '';
      this.paymentService
        .getOrderStatusExtended({
          orderId: params.get('orderId') || '',
        })
        .subscribe((response) => {
          this.response = response;
          if (response.actionCode !== 0)
            this.snackBar.open('The payment did not succeed', 'Ok!', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          else {
            this.billService.postPayment(this.billId, {
              orderStatus: response.orderStatus || 0,
              cardHolderName: response.cardAuthInfo.cardholderName || '',
            });
          }
        });
    });

    this.billService
      .getMedications(this.billId)
      .subscribe((medications) => (this.medications = medications));
  }
}
