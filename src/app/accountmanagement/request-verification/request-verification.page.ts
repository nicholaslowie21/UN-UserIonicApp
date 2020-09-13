import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-request-verification',
  templateUrl: './request-verification.page.html',
  styleUrls: ['./request-verification.page.scss'],
})
export class RequestVerificationPage implements OnInit {
  currentUser: any;
  images: any;
  status: any;
  accountType: any;
  constructor(private alertCtrl:AlertController, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser().data.user;
    this.status = this.currentUser.isVerified;
    console.log(this.status);
  }

  back() {
    this.router.navigateByUrl("/tabs/settings")
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  verify() {
    const formData = new FormData();
    formData.append('verifyPic', this.images);
    this.authService.requestVerification(formData).subscribe((res) => {
      console.log(res.msg);
        this.showAlert(res.msg);
    },
    err => {
        this.showAlert(err.error.msg);
        console.log('********** RequestUserVerification.ts: ', err.error.msg);
    })
  }

  ionViewDidEnter() {
    this.currentUser = this.tokenStorage.getUser().data.user;
    this.status = this.currentUser.isVerified;
    this.accountType = this.tokenStorage.getAccountType();
  }

  async showAlert(msg) {  
    const alert = await this.alertCtrl.create({  
      header: 'Success',  
      subHeader: "You will be notified once an admin has verified your account", 
      message: msg,  
      buttons: [{
        text: 'Return to Settings',
        role: 'cancel',
        handler: () => {
         this.back();
        }
      }]
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  }

  async showError(msg) {  
    const alert = await this.alertCtrl.create({  
      header: 'Error',  
      subHeader: "You will be notified once an admin has verified your account", 
      message: msg,  
      buttons: ['Return to Settings']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  }
}
