import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  accountType: any;
  currResource: any;
  currResourceType: any;

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public setAccountType(type) {
    this.accountType = type;
  }

  public getAccountType(): any {
    return this.accountType;
  }

  // public getCurrResource(): any {
  //   return this.currResource;
  // }
  
  // public saveCurrResource(currResource) {
  //   console.log(currResource);
  //   this.currResource = currResource;
  // }

  // public getCurrResourceType(): any {
  //   return this.currResourceType;
  // }

  // public saveCurrResourceType(currResourceType) {
  //   console.log(currResourceType);
  //   this.currResourceType = currResourceType;
  // }
}