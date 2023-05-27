import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GoogleAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';
import { UserService } from '../user.service';
import { GapiService } from '../gapi-service/gapi.service';

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
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    private gapi: GapiService
  ) { }

  public user: any;

  async ngOnInit() {
    this.shoppingCartService.$totalCount.subscribe(
      (count) => (this.cartSize = count)
    );

    this.user = this.userService.getUserData();
  }

  async signInWithGoogle() {
    const res = await this.gapi.signIn();
    this.user = await this.gapi.getUserData();
    this.userService.setUserData(this.user);
  }

  async signOutWithGoogle() {
    await this.gapi.signOut();
    this.user = null;
    this.userService.setUserData(null);
  }
}
