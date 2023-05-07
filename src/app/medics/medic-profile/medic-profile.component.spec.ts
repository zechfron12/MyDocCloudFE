import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicProfileComponent } from './medic-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MedicProfileComponent', () => {
  let component: MedicProfileComponent;
  let fixture: ComponentFixture<MedicProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MedicProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
