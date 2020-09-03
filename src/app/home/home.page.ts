import { AuthService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 
  data = '';
 
  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController) { }
 
  ngOnInit() {
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