import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicPageComponent } from './medic-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MedicPageComponent', () => {
  let component: MedicPageComponent;
  let fixture: ComponentFixture<MedicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MedicPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
