import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Medication } from 'src/models/medication';
import { MedicationService } from 'src/shared/services/medication.service';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';

@Component({
  selector: 'app-drug-card',
  templateUrl: './drug-card.component.html',
  styleUrls: ['./drug-card.component.css'],
})
export class DrugCardComponent implements OnInit {
  @Input() drug = {} as Medication;
  @Input() editable = false;
  @Input() counter = 0;
  @Input() canBuy = false;
  @Input() forCart = false;
  @Input() canDelete = false;
  @Output() delete = new EventEmitter<string>();

  constructor(
    private medicationService: MedicationService,
    private shoppingService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.medicationService.collection$.subscribe((medications) => {
      this.drug =
        medications.find((el) => el.id === this.drug.id) || ({} as Medication);
    });
  }

  onSubmit(medication: Medication) {
    this.medicationService.update(medication);
  }
  onDelete(event: any) {
    this.delete.emit(this.drug.id);
  }

  addToCart() {
    this.shoppingService.addToCard(this.drug);
  }

  decreaseFromCart() {
    this.shoppingService.decreaseFromCart(this.drug.id);
  }
}
