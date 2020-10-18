import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InstitutionService } from '../services/institution.service';
import { MobileService } from '../services/mobile.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-card-institution',
  templateUrl: './change-card-institution.page.html',
  styleUrls: ['./change-card-institution.page.scss'],
})
export class ChangeCardInstitutionPage implements OnInit {
  currentUser: any;
  accountType: any;
  inputData: string;
  institutions: any;
  institutionsList: any[];
  data: {};
  institutionChoice: any;
  institutionChoiceId: any;
  institutionChoiceName: any;

  constructor(private router: Router, private userService: UserService, private toastCtrl: ToastController, private mobileService: MobileService, private sessionService: SessionService, private tokenStorage: TokenStorageService, private institutionService: InstitutionService) { }

  ngOnInit() {
    
    this.currentUser = this.tokenStorage.getUser();
    console.log(this.currentUser)
    this.accountType = this.tokenStorage.getAccountType();
    //get institution of choice name
    this.institutionChoice = this.currentUser.data.user.institutionChoice;
    this.institutionService.viewInstitutionById(this.currentUser.data.user.institutionChoice).subscribe((res)=> {
      this.institutionChoiceName = res.data.targetInstitution.name;
      
      console.log(this.institutionChoice)
    }, (err) => {
      console.log("institution choice error: " + err.error.msg);
    })

    this.institutions = this.currentUser.data.user.institutionIds
    console.log(this.currentUser);
    if(this.institutions != undefined) {
      this.institutionsList = [];
      for(var i = 0; i < this.institutions.length; i++) {
        this.institutionService.viewInstitutionById(this.institutions[i]).subscribe((res)=> {
          var x = {"id": res.data.targetInstitution.id, "name": res.data.targetInstitution.name};
          this.institutionsList.push(x);
          
        }, (err) => {
          console.log("********Institution retrieval error: " + err.error.msg)
        })
      }
    }

  }

  ionViewDidEnter() {
    this.currentUser = this.tokenStorage.getUser();
    this.userService.viewUserById(this.currentUser.data.user.id).subscribe((res)=> {
      this.institutionChoice = res.data.targetUser.institutionChoice;
      this.institutionService.viewInstitutionById(this.institutionChoice).subscribe((res)=> {
        this.institutionChoiceName = res.data.targetInstitution.name;
      }, (err) => {
        console.log("********Institution retrieval error: " + err.error.msg)
      })
      console.log(res.data.targetUser);
    }, (err) => {
      console.log("error retrieving user: " + err.error.msg)
    })
  }

  chooseInstitute() {
    console.log(this.institutionChoice);
    this.data = {
      "id": this.institutionChoice
    }
    this.mobileService.chooseInstitution(this.data).subscribe( (res) => {
      this.successToast();
      this.router.navigateByUrl("/contact-page")
    }, (err) => {
      this.failureToast(err.error.msg);
      console.log(err.error.msg);
    })

  }

  removeInstitution() {
    this.mobileService.removeInstitutionChoice().subscribe((res) => {
      this.successDelToast();
      this.router.navigateByUrl("/contact-page");
    }, err => {
      this.failureDelToast(err.error.msg);
      console.log(err.error.msg);
    })
  }

  async successToast() {
    const toast = this.toastCtrl.create({
      message: 'Institution Changed Successfully!',
      duration: 1000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }
 
  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Institution Changed unsuccessfully: ' + error,
      duration: 1000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async successDelToast() {
    const toast = this.toastCtrl.create({
      message: 'Institution of Choice Removed Successfully!',
      duration: 1000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }
 
  async failureDelToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Institution of Choice Removed unsuccessfully: ' + error,
      duration: 1000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

}
