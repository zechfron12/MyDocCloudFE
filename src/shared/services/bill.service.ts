import { Injectable } from '@angular/core';
import AbstractRestService from '../abstracts/AbstractRestService';
import { BillPayment, Payment } from 'src/models/payment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Medication } from 'src/models/medication';

@Injectable({
  providedIn: 'root',
})
export class BillService extends AbstractRestService<BillPayment> {
  constructor(private http: HttpClient) {
    super(
      http,
      environment.BASE_API_URL + 'Bills',
      new BehaviorSubject<BillPayment[]>([])
    );
  }

  override post(bill: BillPayment) {
    return this.http.post<BillPayment>(this._url, bill);
  }

  getMedications(billId: string) {
    return this.http.get<Medication[]>(
      this._url + '/' + billId + '/medications'
    );
  }

  postMedications(billId: string, medications: Medication[]) {
    this.http
      .post(this._url + '/' + billId + '/medications', medications)
      .subscribe();
  }

  getPayment(billId: string) {
    this.http.get<Payment>(this._url + '/' + billId + '/payment');
  }

  postPayment(billId: string, payment: Payment) {
    this.http.post<Payment>(this._url + '/' + billId + '/payment', payment);
  }
}
