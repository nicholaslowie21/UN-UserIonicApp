import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ANNOUNCEMENT_LENGTH = 'annLength';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  accountType: any;
  projectId: any;
  currResourceTitle: any;
  viewId: any;
  announcementLength: any;

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveAnnouncementLength(a) {
    window.sessionStorage.setItem(ANNOUNCEMENT_LENGTH, a);
  }

  public getAnnouncementLength(): any {
    return sessionStorage.getItem(ANNOUNCEMENT_LENGTH);
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

  public setProjectId(projectId) {
      this.projectId = projectId;
  }

  public getProjectId(): any {
      return this.projectId;
  }

  public saveViewId(viewId) {
    this.viewId = viewId;
  }

  public getViewId() {
    return this.viewId;
  }


  public getCurrResourceName(): any {
    return this.currResourceTitle;
  }
  
  public saveCurrResourceName(currResourceTitle) {
    console.log(currResourceTitle);
    this.currResourceTitle = currResourceTitle;
  }

  // public getCurrResourceType(): any {
  //   return this.currResourceType;
  // }

  // public saveCurrResourceType(currResourceType) {
  //   console.log(currResourceType);
  //   this.currResourceType = currResourceType;
  // }
}