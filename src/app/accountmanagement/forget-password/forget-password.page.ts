import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  email: any;
  forgotForm: any;

  accountBoolean: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  clicked: boolean;


  constructor(private alertCtrl:AlertController, private tokenStorage: TokenStorageService, private authService: AuthService, private router: Router) {
      this.resultSuccess = false;
      this.resultError = false;
      this.clicked = false;
   }

  ngOnInit() {
  }

  passwordRetrieve() {
    this.clicked = true;
    this.forgotForm = {
      "email": this.email
    }
    this.authService.resetPassword(this.forgotForm).subscribe((res) => {
      this.resultSuccess = true;
      this.resultError = false;
      this.showAlert(res.msg);
  },err => {
    this.resultSuccess = false;
    this.resultError = true;
    console.log('********** UpdateUserEmail.ts: ', err.error.msg);
  });
  }
  
  async showAlert(msg) {  
    const alert = await this.alertCtrl.create({  
      header: 'Success',  
      subHeader: "An email has been sent to " + this.email,  
      message: msg,  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  }
}
