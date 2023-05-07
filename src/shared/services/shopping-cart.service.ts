import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Medication } from 'src/models/medication';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  $items = new BehaviorSubject<{ count: number; medication: Medication }[]>([]);
  $totalCount = new BehaviorSubject<number>(0);
  $totalPrice = new BehaviorSubject<number>(0);
  constructor() {
    this.$items.subscribe((items) => {
      let totalCount = 0;
      let totalPrice = 0;
      items.forEach((item) => {
        totalCount += item.count;
        totalPrice += item.medication.price * item.count;
      });

      this.$totalCount.next(totalCount);
      this.$totalPrice.next(totalPrice);
    });
  }

  addToCard(medication: Medication) {
    const newItems = this.items;
    const index = newItems.findIndex(
      (item) => item.medication.id === medication.id
    );

    if (index === -1) newItems.push({ count: 1, medication });
    else {
      newItems[index].count++;
    }

    this.$items.next(newItems);
  }

  decreaseFromCart(medicationId: string) {
    const newItems = this.items;
    const index = newItems.findIndex(
      (item) => item.medication.id === medicationId
    );

    if (index !== -1) {
      newItems[index].count--;
      this.$items.next(newItems);
    }
  }

  cleanCart() {
    this.$items.next([]);
  }

  delete(medicationId: string) {
    const newItems = this.items;
    const index = newItems.findIndex(
      (item) => item.medication.id === medicationId
    );

    if (index !== -1) {
      newItems.splice(index, 1);
      this.$items.next(newItems);
    }
  }

  private get items() {
    return this.$items.getValue();
  }
}
