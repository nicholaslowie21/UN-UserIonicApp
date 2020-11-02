import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { InstitutionService } from '../services/institution.service';
import { RewardsService } from '../services/rewards.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transfer-rewards',
  templateUrl: './transfer-rewards.page.html',
  styleUrls: ['./transfer-rewards.page.scss'],
})
export class TransferRewardsPage implements OnInit {
  @Input("voucherId") voucherId
  @Input("code") code
  @Input("voucherTitle") voucherTitle
  @Input("voucherDesc") voucherDesc
  @Input("voucherImg") voucherImg
  @Input("claimedAt") claimedAt
  @Input("endDate") endDate
  users: any;
  words: any;
  data: {};
  constructor(private modalCtrl: ModalController, 
    private router: Router, 
    private institutionService: InstitutionService, 
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private rewardsService: RewardsService) { }

  ngOnInit() {
    console.log(this.voucherImg);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.router.navigateByUrl("/rewards")
  }

  search(words) {
    this.institutionService.searchUser(words).subscribe((res) => {
      this.users = res.data.users;
    },
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** AddInstitutionMemberPage.ts: ', err.error.msg);
    });
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'User cannot be found: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async presentAlertConfirm(u) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to transfer to ' + u.name + "?",
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
            this.transferVoucher(u);
          }
        }
      ]
    });

    await alert.present();
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  transferVoucher(u) {
    this.data = {
      "voucherId": this.voucherId,
      "targetId": u.id
    }

    this.rewardsService.transferReward(this.data).subscribe((res) => {
      this.successToast();
      this.dismiss();
    }, (err) => {
      this.failureToast(err.error.msg);
      console.log("***********Transfer reward error: " + err.error.msg)
    })
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Transferred successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }
}
