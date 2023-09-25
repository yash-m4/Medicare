import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  doubtR:boolean=false;

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
  setdoubtR(value: boolean) {
    this.doubtR = value;
  }
  isdoubtR(): boolean {
    return this.doubtR;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }
}
