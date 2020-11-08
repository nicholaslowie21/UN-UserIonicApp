import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ReportService } from 'src/app/services/report.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.page.html',
  styleUrls: ['./create-report.page.scss'],
})
export class CreateReportPage implements OnInit {
  @Input("targetId") targetId
  @Input("type") type
  @Input("name") name
  accountType: any;
  currentUser: any;
  accountBoolean: boolean;
  isVerified: boolean;
  data: { title: any; summary: any; reportType: any; targetId: any; };
  title: any;
  summary: any;

  constructor(private tokenStorage: TokenStorageService, 
    private reportService: ReportService, 
    private toastCtrl: ToastController,
    private router: Router,
    private modalCtrl: ModalController) {
    this.currentUser = this.tokenStorage.getUser();
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      if(this.currentUser.data.user.isVerified == true) {
        this.isVerified = true;
      }
    } else if(this.accountType == "user") {
      if(this.currentUser.data.user.isVerified == "true") {
        this.isVerified = true;
      }
      this.accountBoolean = false;
    }
   }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  createReport() {
    this.data ={ 
      "title": this.title,
      "summary": this.summary,
      "reportType": this.type,
      "targetId": this.targetId
    }

    this.reportService.createReport(this.data).subscribe((res) => {
      this.successToast();
      this.dismiss();
    }, (err) => {
      this.failureToast(err.error.msg);
      console.log("************Create report error: " + err.error.msg)
    })
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Report is filed successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Report is filed unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

}
