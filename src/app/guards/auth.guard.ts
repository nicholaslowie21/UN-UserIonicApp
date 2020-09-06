import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/authentication.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(public authService: AuthService) {}
 
  //Check for the status of our authentication
  //Apply this guard to the protected routes 
  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }
}
