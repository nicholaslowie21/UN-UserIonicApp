import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { MarketplaceService } from '../services/marketplace.service';

@Component({
  selector: 'app-projrequest-modal',
  templateUrl: './projrequest-modal.page.html',
  styleUrls: ['./projrequest-modal.page.scss'],
})
export class ProjrequestModalPage implements OnInit {
  @Input("resource") resource
  @Input("resType") resType
  @Input("needId") needId
  data: any;
  resultSuccess: any;
  resultError: any;
  message: any;
  constructor(private router: Router, private toastCtrl: ToastController, private modalCtrl: ModalController, private marketplaceService: MarketplaceService) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  createRes(form) {
    console.log(this.needId);
    console.log(this.resource.id)
    this.data = {
      "needId": this.needId,
      "resourceId": this.resource.id,
      "resType": this.resType,
      "desc": this.resource.desc
    }

    this.marketplaceService.createProjectRequest(this.data).subscribe((res)=> {
          this.successToast();
          this.dismiss();
          this.router.navigate(["/create-project-request/" + this.needId + "/" + this.resType]);
    }, (err) => {
      this.failureToast(err.error.msg);
      console.log("*************Create Project Request modal error: " + err.error.msg);
    })
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Contribution request is created successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Contribution request is created unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }




}
