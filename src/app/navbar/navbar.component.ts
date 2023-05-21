import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GoogleAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';
import { UserService } from '../user.service';

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
    private userService: UserService
  ) {}

    public user: any;

  ngOnInit(): void {
    this.shoppingCartService.$totalCount.subscribe(
      (count) => (this.cartSize = count)
    );

    this.user = this.userService.getUserData();
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    auth.languageCode = 'it';

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
     
        this.user = result.user;
        this.userService.setUserData(result.user);

      }).catch((error) => {
    
        console.log(error)
      });
  }
}
