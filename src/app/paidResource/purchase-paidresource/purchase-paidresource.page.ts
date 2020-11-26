import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { PaidresourceService } from 'src/app/services/paidresource.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-purchase-paidresource',
  templateUrl: './purchase-paidresource.page.html',
  styleUrls: ['./purchase-paidresource.page.scss'],
})
export class PurchasePaidresourcePage implements OnInit {
  @Input("paidResource") paidResource
  accountType: any;
  user: any;
  resourceName: any;
  accountBoolean: boolean;
  projectList: any;
  currProject: any;
  createData: { paidResourceId: any; projectId: any; };
  constructor(private marketplaceService: MarketplaceService, 
    private tokenStorage: TokenStorageService,
    private paidService: PaidresourceService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertController: AlertController) {
    this.accountType = this.tokenStorage.getAccountType();
    this.user = this.tokenStorage.getUser().data.user;
    this.resourceName = this.tokenStorage.getCurrResourceName();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else if(this.accountType == "user") {
      this.accountBoolean = false;
    }
   }

  ngOnInit() {
    this.marketplaceService.getAccountProjects({"id":this.user.id, "type": this.accountType}).subscribe((res) => {
      this.projectList = res.data.theProjects;
    }), err => {
      console.log('********** RequestResource(Proj List).ts: ', err.error.msg);
    }
  }

  create() {
    console.log(this.currProject);
    this.createData = {
      "paidResourceId": this.paidResource.id,
      "projectId": this.currProject
    }
    this.paidService.createPaidResourceRequest(this.createData).subscribe((res) => {
      this.successToast();
      this.dismiss();
    }, (err) => {
      this.failureToast(err.error.msg)
      console.log("Create Paid Resource Request err:" + err.error.msg);
    })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Request to purchase is sent successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Request to purchase is sent unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async confirmPurchase(event)
	{
		const alert = await this.alertController.create({
			header: 'Purchase Resource',
			message: 'Payment will be requested when resource owner accepts the purchase. Confirm purchase this Resource?',
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
          this.create();
			}}]
		});

		await alert.present(); 
  }

}
