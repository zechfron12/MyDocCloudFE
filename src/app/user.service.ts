import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUserData() {
    const user = {
      email: localStorage.getItem("email"),
      displayName: localStorage.getItem("displayName"),
      photoURL: localStorage.getItem("photoURL"),
      token: localStorage.getItem("token")
    }
    return user;
  }

  public setUserData(user: any, token: any) {
    
    if (user) {
      localStorage.setItem("email", user.email);
      localStorage.setItem("displayName", user.displayName);
      localStorage.setItem("photoURL", user.photoURL);
      if(token !== null) {
        localStorage.setItem("token", token);
      }
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("displayName");
      localStorage.removeItem("photoURL");
      localStorage.removeItem("token");
    }
  }

}
