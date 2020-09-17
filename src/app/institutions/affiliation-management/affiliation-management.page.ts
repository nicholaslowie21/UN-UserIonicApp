import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/services/institution.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-affiliation-management',
  templateUrl: './affiliation-management.page.html',
  styleUrls: ['./affiliation-management.page.scss'],
})
export class AffiliationManagementPage implements OnInit {
  members: any[];
  user: any;
  data: {};

  constructor(private sessionService: SessionService, private institutionService: InstitutionService, private tokenStorage: TokenStorageService, private alertController: AlertController, private toastCtrl: ToastController, private router: Router) {
   }
  
  ngOnInit() {
    this.user = this.tokenStorage.getUser();
    console.log(this.user);
    this.institutionService.getMembers(this.user.data.user.id).subscribe((res) => {
      this.members = res.data.members
      for(var i=0; i < this.members.length; i++) {
        this.members[i].profilePic =  this.sessionService.getRscPath() + this.members[i].ionicImg +'?random+=' + Math.random();
        console.log(this.members[i].profilePic);
      }
    }
    )
    err => {
      console.log('********** AffiliationManagementPage.ts: ', err.error.msg);
    };
  }

  ionViewDidEnter() {
    this.institutionService.getMembers(this.user.data.user.id).subscribe((res) => {
      this.members = res.data.members
      for(var i=0; i < this.members.length; i++) {
        this.members[i].profilePic =  this.sessionService.getRscPath() + this.members[i].ionicImg +'?random+=' + Math.random();
      }
    }
    )
    err => {
      console.log('********** AffiliationManagementPage.ts: ', err.error.msg);
    };
  }

  remove(m) {
    this.data = {
      "userId": m.id
    }
    this.institutionService.delMembers(this.data).subscribe((res) => {
      this.successToast();
      this.router.navigateByUrl("/tabs/profile");
    }
   ),
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** AffiliationManagementPage.ts: ', err.error.msg);
    };
  }

  async presentAlertConfirm(ev, m) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to remove this member?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.remove(m);
          }
        }
      ]
    });

    await alert.present();
  }

  async successToast() {
    const toast = this.toastCtrl.create({
      message: 'Member deleted successfully',
      duration: 1000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }
 
  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Member deleted unsuccessfully: ' + error,
      duration: 1000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

}
