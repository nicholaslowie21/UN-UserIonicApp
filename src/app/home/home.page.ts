import { AuthService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { TokenStorageService } from '../services/token-storage.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  data = '';
  accountType: any;
  accountBoolean: boolean;
 
  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController, private tokenStorage: TokenStorageService) { 
    this.accountType = this.tokenStorage.getAccountType();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
  }
  ngOnInit() {
    this.tokenStorage.getUser();
  }

  test(): void {
    this.authService.test().subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err.error.msg);
      }
    )
  }
 
  logout() {
    this.authService.logout();
  }
 
  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');
 
    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }
 
}