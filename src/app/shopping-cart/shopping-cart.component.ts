import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Medication } from 'src/models/medication';
import {
  BillPayment,
  CURRENCIES,
  PaymentParams,
  RegisterDoParams,
} from 'src/models/payment';
import { PaymentService } from 'src/shared/services/payment.service';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';
import { PrescriptionService } from 'src/shared/services/prescription.service';
import { BillService } from 'src/shared/services/bill.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  items: { count: number; medication: Medication }[] = [];
  totalPrice: number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private domSanitizerService: DomSanitizer,
    private prescriptionService: PrescriptionService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.$items.subscribe((items) => (this.items = items));
    this.shoppingCartService.$totalPrice.subscribe(
      (price) => (this.totalPrice = +price.toFixed(2))
    );
  }

  deleteFromCart(medicationId: string) {
    this.shoppingCartService.delete(medicationId);
  }

  onPay() {
    if (this.totalPrice !== 0) {
      const bill: BillPayment = {};
      this.billService.post({}).subscribe((bill) => {
        const medications = this.items.map((item) => item.medication);
        this.billService.postMedications(bill.id || ' ', medications);
        const paymentParams: PaymentParams = {
          value: this.totalPrice.toString(),
          description: 'testing',
          bill_id: bill.id || '',
        };
        this.paymentService.doPayment(paymentParams).subscribe((result) => {
          console.log(result);

          const safeUrl = this.domSanitizerService.sanitize(
            SecurityContext.RESOURCE_URL,
            this.domSanitizerService.bypassSecurityTrustResourceUrl(result.url)
          );
          this.document.location.href = safeUrl || 'localhost:4200';
        });
        this.prescriptionService.deleteToBeDeletedPrescriptions();
        this.shoppingCartService.cleanCart();
      });
    } else {
      this.snackBar.open('The shopping cart is empty', 'Ok!', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
