import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USERNAME, PASSWORD, PAYMENT_API_URL } from 'src/environments/global';
import {
  BillPayment,
  OrderStatusParams,
  OrderStatusResponse,
  RegisterDoParams,
  RegisterDoResponse,
} from 'src/models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getRegisterDoResponse(registerDoParams: RegisterDoParams) {
    const endpoint = PAYMENT_API_URL + 'register.do';

    const body = new URLSearchParams();

    body.set('userName', USERNAME);
    body.set('password', PASSWORD);

    for (const key in registerDoParams) {
      if (Object.prototype.hasOwnProperty.call(registerDoParams, key)) {
        let element = registerDoParams[key as keyof RegisterDoParams];
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

    return this.http.post<RegisterDoResponse>(endpoint, body, httpOptions);
  }

  getOrderStatusExtended(orderStatusParamas: OrderStatusParams) {
    const endpoint = PAYMENT_API_URL + 'getOrderStatusExtended.do';

    const body = new URLSearchParams();
    body.set('userName', USERNAME);
    body.set('password', PASSWORD);

    for (const key in orderStatusParamas) {
      if (Object.prototype.hasOwnProperty.call(orderStatusParamas, key)) {
        let element = orderStatusParamas[key as keyof OrderStatusParams] as any;
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
    return this.http.post<OrderStatusResponse>(endpoint, body, httpOptions);
  }

  savePayment(payment: BillPayment) {}
}
