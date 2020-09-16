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

  notVerified: boolean;
  pendingVerified: boolean;
  verified: boolean;

  constructor(private alertCtrl:AlertController, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser().data.user;
    if(this.currentUser.isVerified == "false") {
      this.notVerified = true;
    } else if(this.currentUser.isVerified == "pending"){
      this.pendingVerified = true;
    } else {
      this.verified = true;
    }
      

   
  }

  back() {
    this.router.navigateByUrl("/tabs/profile")
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
        this.showError(err.error.msg);
        console.log('********** RequestUserVerification.ts: ', err.error.msg);
    })
  }

  ionViewDidEnter() {
    this.currentUser = this.tokenStorage.getUser().data.user;
    if(this.currentUser.isVerified == "false") {
      this.notVerified = true;
    } else if(this.currentUser.isVerified == "pending"){
      this.pendingVerified = true;
    } else {
      this.verified = true;
    }
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
  }

  async showError(msg) {  
    const alert = await this.alertCtrl.create({  
      header: 'Error',  
      subHeader: "You encountered a problem requesting for verification. Do try again.", 
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
}
