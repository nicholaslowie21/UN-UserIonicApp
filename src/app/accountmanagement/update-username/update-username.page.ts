import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service'
import { InstitutionService } from '../../services/institution.service'
import { TokenStorageService } from '../../services/token-storage.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-update-username',
  templateUrl: './update-username.page.html',
  styleUrls: ['./update-username.page.scss'],
})
export class UpdateUsernamePage implements OnInit {
  updateForm: any;
  username: any;
  user: any;
  accountType: any;

  accountBoolean: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  isLoggedIn: boolean;
    
  constructor(private  userService:  UserService, 
              private  router:  Router, 
              private toastCtrl: ToastController, 
              private tokenStorage: TokenStorageService,
              private institutionService: InstitutionService) { 
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
      this.user = this.tokenStorage.getUser().data.user;
    }
  }

  update() {
    console.log(this.username);
    if(this.accountBoolean == false){
        this.updateForm = {
          "username": this.user.username
        }
        this.userService.updateUsername(this.updateForm).subscribe((res) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.successToast();
          this.router.navigateByUrl('/accountsettings');
        },
        err => {
          this.resultSuccess = false;
          this.resultError = true;
          this.failureToast(err.error.msg);
          console.log('********** UpdateUserUsername.ts: ', err.error.msg);
        });
    } else {
        this.updateForm = {
          "username": this.user.username

        }
        this.institutionService.updateUsername(this.updateForm).subscribe((res) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.successToast();
          this.router.navigateByUrl('tabs');
        },
        err => {
          this.resultSuccess = false;
          this.resultError = true;
          this.failureToast(err.error.msg);
          console.log('********** UpdateInstitutionUsername.ts: ', err.error.msg);
        });
    }
  }

  back() {
    this.router.navigateByUrl('/accountsettings');
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Update successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Update Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}


