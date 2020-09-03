import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  user = null;

  constructor(private auth: AuthService, private router: Router) {}
 
  ionViewWillEnter() {
    //this.user = this.auth.getUser();
  }
 
  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }
  
}
