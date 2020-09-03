import { AuthService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }
 
  
  //Check for the status of our authentication
  //Apply this guard to the protected routes 
  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}