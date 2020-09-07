import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service'
import { InstitutionService } from '../services/institution.service'
import { TokenStorageService } from '../services/token-storage.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

    updateForm: any;
    name: string; 
    email: string;
    bio: string;
    occupation: string;
    country: string;
    message: string;
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
    //this.user = this.tokenStorage.getUser().data.user
    console.log(this.tokenStorage.getUser().data);
    this.accountType = this.tokenStorage.getAccountType();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
    console.log(this.user);
  }
          

  ngOnInit() {
    console.log(this.tokenStorage.getToken());
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser().data.user;
    }
  }

  update() {
    if(this.accountBoolean == false){
        this.updateForm = {
          "name": this.user.name,
          "occupation": this.user.occupation,
          "bio": this.user.bio,
          "country": this.user.country

        }
        this.userService.updateProfile(this.updateForm).subscribe((res) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.successToast();
          this.router.navigateByUrl('tabs');
        },
        err => {
          this.resultSuccess = false;
          this.resultError = true;
          this.failureToast(err.error.msg);
          console.log('********** UpdateUserProfile.ts: ', err.error.msg);
        });
    } else {
        this.updateForm = {
          "name": this.user.name,
          "address": this.user.address,
          "bio": this.user.bio,
          "country": this.user.country,
          "phone": this.user.phone

        }
        this.institutionService.updateProfile(this.updateForm).subscribe((res) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.successToast();
          this.router.navigateByUrl('tabs');
        },
        err => {
          this.resultSuccess = false;
          this.resultError = true;
          this.failureToast(err.error.msg);
          console.log('********** UpdateUserProfile.ts: ', err.error.msg);
        });
    }
  }

  back() {
    this.router.navigateByUrl("/tabs/settings");
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
