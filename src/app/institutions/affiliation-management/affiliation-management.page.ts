import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/services/institution.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-affiliation-management',
  templateUrl: './affiliation-management.page.html',
  styleUrls: ['./affiliation-management.page.scss'],
})
export class AffiliationManagementPage implements OnInit {
  members: any[];
  user: any;
  data: {};

  constructor(private institutionService: InstitutionService, private tokenStorage: TokenStorageService, private alertController: AlertController, private toastCtrl: ToastController, private router: Router) {
    this.members = [{"userID": "5f527102fb5e4822bc9eacc0", "name": "Jack Sim", "country": "Singapore"}, {"name": "Lucy Lu", "country": "Malaysia"}];
   }
  
  ngOnInit() {
    this.user = this.tokenStorage.getUser();
    console.log(this.user);
    /*this.institutionService.getMembers().subscribe((res) =>
    this.members = res.data.members)
    err => {
      console.log('********** AffiliationManagementPage.ts: ', err.error.msg);
    };*/
  }

  remove() {
    this.data = {
      "userId": this.user.data.user.id
    }
    this.institutionService.delMembers(this.data).subscribe((res) => {
      this.successToast();
    }
   ),
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** AffiliationManagementPage.ts: ', err.error.msg);
    };
  }

  async presentAlertConfirm() {
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
            this.remove();
          }
        }
      ]
    });

    await alert.present();
  }

  back() {
    this.router.navigateByUrl("/tabs/profile");
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
