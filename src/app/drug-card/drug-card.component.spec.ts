import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugCardComponent } from './drug-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DrugCardComponent', () => {
  let component: DrugCardComponent;
  let fixture: ComponentFixture<DrugCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DrugCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrugCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
