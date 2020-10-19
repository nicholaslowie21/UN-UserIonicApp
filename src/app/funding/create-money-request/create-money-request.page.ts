import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  selector: 'app-create-money-request',
  templateUrl: './create-money-request.page.html',
  styleUrls: ['./create-money-request.page.scss'],
})
export class CreateMoneyRequestPage implements OnInit {
  @Input("resource") resource
  @Input("needId") needId
  moneySum: any;
  data: any;
  resultSuccess: any;
  resultError: any;
  message: any;
  constructor(private modalCtrl: ModalController,
    private marketplaceService: MarketplaceService,
    private toastCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  createRes(form) {
    this.data = {
      "needId": this.needId,
      "desc": this.resource.fundingDesc,
      "moneySum": this.moneySum
    }

    this.marketplaceService.contributeMoney(this.data).subscribe((res)=> {
          this.successToast();
          this.dismiss();
          this.router.navigateByUrl("/view-funding-needs")
    }, (err) => {
      this.failureToast(err.error.msg);
      console.log("*************Create Project Request modal error: " + err.error.msg);
    })
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Contribution Money request is created successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Contribution Money request is created unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

}
