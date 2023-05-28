import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  BillPayment,
  OrderStatusParams,
  OrderStatusResponse,
  PaymentParams,
  RegisterDoParams,
  RegisterDoResponse,
} from 'src/models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  doPayment(registerDoParams: PaymentParams) {
    const endpoint =
      'https://europe-central2-mydocappointmentfe.cloudfunctions.net/pay';

    const body = new URLSearchParams();

    for (const key in registerDoParams) {
      if (Object.prototype.hasOwnProperty.call(registerDoParams, key)) {
        let element = registerDoParams[key as keyof PaymentParams];
        if (typeof element === 'object') {
          element = JSON.stringify(element).trim();
        }
        body.set(key, element);
      }
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.post<{ url: string }>(endpoint, body, httpOptions);
  }
}
