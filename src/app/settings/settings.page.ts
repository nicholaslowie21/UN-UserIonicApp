import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  isLoggedIn = false;
  user: any;
  email: any;
  name: any;
  accountType: any;

  accountBoolean: any;

  constructor(private auth: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}
 
  ngOnInit(): void {
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
      console.log(this.user);
      this.accountType = this.user.data.accountType;
      if(this.accountType == "institution") {
        this.accountBoolean = true;
      } else if(this.accountType == "user") {
        this.accountBoolean = false;
      }
      console.log(this.accountBoolean);

  }

  ionViewDidEnter() {
      this.user = this.tokenStorage.getUser();
      this.email = this.user.data.user.email;
      this.name = this.user.data.user.name;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  update() {
    this.router.navigateByUrl("/update-profile");
  }
  
}
