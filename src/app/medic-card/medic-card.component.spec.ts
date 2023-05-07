import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicCardComponent } from './medic-card.component';

describe('MedicCardComponent', () => {
  let component: MedicCardComponent;
  let fixture: ComponentFixture<MedicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
