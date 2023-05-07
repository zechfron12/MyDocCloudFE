import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  cartSize: number = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.$totalCount.subscribe(
      (count) => (this.cartSize = count)
    );
  }
}
