import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
