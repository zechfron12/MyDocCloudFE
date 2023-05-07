import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicFormComponent } from './medic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MedicFormComponent', () => {
  let component: MedicFormComponent;
  let fixture: ComponentFixture<MedicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [MedicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
