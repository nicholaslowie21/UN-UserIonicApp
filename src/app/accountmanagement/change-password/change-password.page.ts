import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/authentication.service'
import { TokenStorageService } from '../../services/token-storage.service';
import { MustMatch } from '../../helper/validators/match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changeForm: any;
  oldpassword: any;
  newpassword: string;
  confirmPassword: string;
  user: any;
  accountType: any;

  accountBoolean: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  isLoggedIn: boolean;
  
  constructor(private  router:  Router, 
                private toastCtrl: ToastController, 
                private tokenStorage: TokenStorageService,
                private authService: AuthService
                ) { 
    this.resultSuccess = false;
    this.resultError = false;
    this.accountType = this.tokenStorage.getAccountType();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
    }

  ngOnInit() {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
    }

    
  }


  back() {
    this.router.navigateByUrl('/accountsettings');
  }
 
  changeInstitutionPassword() {
      if(this.user.newpassword == this.user.confirmPassword){
        this.changeForm = {
          "oldpassword": this.user.oldpassword,
          "newpassword": this.user.newpassword
        }

        this.authService.changeInstitutionPassword(this.changeForm).subscribe((res) => {
          this.resultSuccess = true;
            this.resultError = false;
            this.successToast();
            this.router.navigateByUrl('/accountsettings');
        },
        err => {
            this.resultSuccess = false;
            this.resultError = true;
            this.failureToast(err.error.msg);
            console.log('********** ChangeInstitutionPassword.ts: ', err.error.msg);
        })
      } else {
        this.failureToast(Error("Passwords do not match"));
    }
  }

  changeUserPassword() {
    if(this.user.newpassword == this.user.confirmPassword){
        console.log(this.user.newpassword);
        console.log(this.user.oldpassword);
          this.changeForm = {
            "oldpassword": this.user.oldpassword,
            "newpassword": this.user.newpassword
          }

          this.authService.changeUserPassword(this.changeForm).subscribe((res) => {
            this.resultSuccess = true;
              this.resultError = false;
              this.successToast();
              this.router.navigateByUrl('tabs');
          },
          err => {
              this.resultSuccess = false;
              this.resultError = true;
              this.failureToast(err.error.msg);
              console.log('********** ChangeUserPassword.ts: ', err.error.msg);
          })
  } else {
    this.failureToast(Error("Passwords do not match"));    
  }
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Password is changed successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Error while changing password: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }


}
