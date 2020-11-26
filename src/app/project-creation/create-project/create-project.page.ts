import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  resultSuccess: boolean;
  resultError: boolean;
  accountBoolean: boolean;
  isLoggedIn: boolean;

  user: any;
  accountType: any;
  title: any;
  desc: any;
  rating: any;
  sdgs: any;
  sdgsList: any[];
  ratingsList: any[];
  form: any;
  isChecked: boolean;

  constructor(private  userService:  UserService, 
    private  router:  Router, 
    private toastCtrl: ToastController, 
    private tokenStorage: TokenStorageService,
    private projectService: ProjectService) { 
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
this.sdgsList = [{"id":1, "name": "No Poverty"},{"id":2,"name": "Zero Hunger"}, {"id":3,"name": "Good Health and Well-Being"},
{"id":4, "name": "Quality Education"}, {"id":5, "name": "Gender Equality"},{"id":6,"name": "Clean Water and Sanitisation"},
{"id":7, "name": "Affordable and Clean Energy"}, {"id":8, "name": "Decent Work and Economic Growth"},{"id":9, "name": "Industry, Innovation and Infrastructure"},
{"id":10, "name": "Reduced Inequalities"}, {"id":11, "name": "Sustainable Cities and Communities"}, {"id":12, "name": "Responsible Consumption and Production"},
{"id":13, "name": "Climate Action"}, {"id":14, "name": "Life Below Water"}, {"id":15, "name": "Life On Land"},
{"id":16, "name": "Peace, Justice and Strong Institutions"},{"id":17, "name": "Partnerships for the Goals"}]
this.ratingsList = [1 ,2 ,3 ,4 ,5];
if(this.tokenStorage.getToken()) {
    this.isLoggedIn = true;
    console.log(this.tokenStorage.getUser());
    this.user = this.tokenStorage.getUser().data.user;
}
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

create() {

  console.log(this.isChecked);
    if(this.isChecked == true) {

    this.form = {
    "title": this.title,
    "desc": this.desc,
    "rating": this.rating,
    "sdgs": this.sdgs,
    }
    this.projectService.createProject(this.form).subscribe((res) => {
    this.resultSuccess = true;
    this.resultError = false;
    this.successToast();
    this.router.navigate(['/my-projects/' + this.user.id]);
    },
    err => {
    this.resultSuccess = false;
    this.resultError = true;
    this.failureToast(err.error.msg);
    console.log('********** CreateProjects.ts: ', err.error.msg);
    });
  } else if(this.isChecked == false) {
    this.failureToast("Please accept the Terms & Conditions before creating the project!!")
  }
} 

async successToast() {
let toast = this.toastCtrl.create({
message: 'Project Creation is successful!',
duration: 2000,
position: 'middle',
cssClass: "toast-pass"      
});
(await toast).present();
}

async failureToast(error) {
const toast = this.toastCtrl.create({
message: 'Project Creation Unsuccessful: ' + error,
duration: 2000,
position: 'middle',
cssClass: "toast-fail"
});
(await toast).present();
}

toProjects() {
  this.router.navigate(["/my-projects/" + this.user.id])
}


}
