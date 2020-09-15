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
    website: any;
    gender: any;
    phone: any;
    skillsString: string;
    sdgs: any[];

    sdgsList:any[];
    skillsArray: any[];
    genderList: any[];

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
    console.log(this.tokenStorage.getAccountType());
    this.accountType = this.tokenStorage.getAccountType();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
    
  }

          

  ngOnInit() {
    this.genderList = [
      {"id": "Male", "g":"male"}, {"id": "Female", "g":"female"}
    ]
    this.sdgsList = [{"id":1, "name": "No Poverty"},{"id":2,"name": "Zero Hunger"}, {"id":3,"name": "Good Health and Well-Being"},
      {"id":4, "name": "Quality Education"}, {"id":5, "name": "Gender Equality"},{"id":6,"name": "Clean Water and Sanitisation"},
      {"id":7, "name": "Affordable and Clean Energy"}, {"id":8, "name": "Decent Work and Economic Growth"},{"id":9, "name": "Industry, Innovation and Infrastructure"},
      {"id":10, "name": "Reduced Inequalities"}, {"id":11, "name": "Sustainable Cities and Communities"}, {"id":12, "name": "Responsible Consumption and Production"},
      {"id":13, "name": "Climate Action"}, {"id":14, "name": "Life Below Water"}, {"id":15, "name": "Life On Land"},
      {"id":16, "name": "Peace, Justice and Strong Institutions"},{"id":17, "name": "Partnerships for the Goals"}]

    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      console.log(this.tokenStorage.getUser());
      this.user = this.tokenStorage.getUser().data.user;
    }
    // this.user.website = "";
    console.log(this.accountBoolean);
    if(this.accountBoolean == false) {
      this.user.skillsString = ""
      for(var i = 0; i < this.user.skills.length; i++) {
        if(i == 0) {
          this.user.skillsString += this.user.skills[i];
        } else {
          this.user.skillsString += "," + this.user.skills[i];
        }
      }
    }  
    
    this.sdgs = this.user.SDGs;
    this.gender = this.user.gender;
    }

    ionViewDidEnter() {
      this.accountType = this.tokenStorage.getAccountType();
      console.log(this.tokenStorage.getUser());
      if(this.accountType == "institution") {
        this.accountBoolean = true;
      } else {
        this.accountBoolean = false;
      }
    }

  update() {
    //user update
    if(this.accountBoolean == false){
      if(this.user.skills.length > 1) {
        this.skillsArray = this.user.skillsString.split(",");
      } else {
        this.skillsArray = [this.user.skillsString];
      }
      
        this.updateForm = {
          "name": this.user.name,
          "occupation": this.user.occupation,
          "bio": this.user.bio,
          "country": this.user.country,
          "website": this.user.website,
          "gender": this.user.gender.toLowerCase(),
          "sdgs": this.sdgs,
          "skills": this.skillsArray

        }
        this.userService.updateProfile(this.updateForm).subscribe((res) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.successToast();
          this.router.navigateByUrl('/tabs');
        },
        err => {
          this.resultSuccess = false;
          this.resultError = true;
          this.failureToast(err.error.msg);
          console.log('********** UpdateUserProfile.ts: ', err.error.msg);
        });
    } else {
      //institution update
        this.updateForm = {
          "name": this.user.name,
          "address": this.user.address,
          "bio": this.user.bio,
          "country": this.user.country,
          "phone": this.user.phone,
          "website": this.user.website,
          "sdgs": this.sdgs

        }
        this.institutionService.updateProfile(this.updateForm).subscribe((res) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.successToast();
          this.router.navigateByUrl('/tabs');
        },
        err => {
          this.resultSuccess = false;
          this.resultError = true;
          this.failureToast(err.error.msg);
          console.log('********** UpdateUserProfile.ts: ', err.error.msg);
        });
    }
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
