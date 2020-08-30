import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  user = null;

  constructor(private auth: AuthService) {}
 
  ionViewWillEnter() {
    this.user = this.auth.getUser();
  }
 
  logout() {
    this.auth.logout();
  }

}
