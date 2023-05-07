import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPresentationComponent } from './payment-presentation.component';

describe('PaymentPresentationComponent', () => {
  let component: PaymentPresentationComponent;
  let fixture: ComponentFixture<PaymentPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
