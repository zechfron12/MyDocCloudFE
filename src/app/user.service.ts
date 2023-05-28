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
      role: localStorage.getItem("role")
    }
    return user;
  }

  public setUserData(user: any) {
    localStorage.setItem("email", user.email);
    localStorage.setItem("displayName", user.displayName);
    localStorage.setItem("photoURL", user.photoURL);
    localStorage.setItem("role", user.role);
  }

  public removeUserData() {
    localStorage.removeItem("email");
    localStorage.removeItem("displayName");
    localStorage.removeItem("photoURL");
    localStorage.removeItem("role");

    localStorage.removeItem("patient");
    localStorage.removeItem("doctor");
  }

}
