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

  constructor(private auth: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}
 
  ngOnInit(): void {
    console.log(this.tokenStorage.getUser());
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
      console.log("User from settings:" + this.user.data.user.email);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  update() {
    this.router.navigateByUrl("/update-profile");
  }
  
}
