import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { InstitutionService } from '../services/institution.service';
import { RewardsService } from '../services/rewards.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { TransferRewardsPage } from '../transfer-rewards/transfer-rewards.page';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  accountType: any;
  currentUser: any;
  accountBoolean: boolean;
  vouchers: any;
  modal: any;

  constructor(private router: Router, 
    private sessionService: SessionService, 
    private tokenStorage: TokenStorageService,
    private rewardsService: RewardsService,
    private userService: UserService,
    private institutionService: InstitutionService, 
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private modalController: ModalController) {
    this.accountType = this.tokenStorage.getAccountType();
    this.currentUser = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
   }

  ngOnInit() {
    this.initialise();
  }

  ionViewDidEnter() {
    console.log("View entered")
    this.initialise();
  }

  initialise() {
    this.rewardsService.getVouchers().subscribe((res)=> {
        this.vouchers = res.data.vouchers
        if(this.vouchers != undefined) {
          for(var i = 0; i < this.vouchers.length; i ++) {
            this.vouchers[i].rewardImgPath = this.sessionService.getRscPath() + this.vouchers[i].rewardImgPath +'?random+=' + Math.random();
          }
        }
    }, (err) => {
      console.log("*********Retrieve Voucher error: " + err.error.msg)
    })
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  async claim(event, voucher)
	{
		const alert = await this.alertController.create({
			header: 'Make sure the store owner sees you claiming the voucher!',
			message: 'Are you sure you want to claim this voucher?',
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
				this.claimRewards(voucher);
			  }
			}
			]
		});

		await alert.present(); 
  }

  claimRewards(voucher) {
    this.rewardsService.claimVoucher(voucher.id).subscribe((res) => {
      this.successToast();
      this.initialise();
    }, (err) => {
      this.failureToast(err.error.msg)
      console.log("***************Claim Rewards error: " + err.error.msg);
    })
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Claimed Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
  
  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Claimed successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async transfer(voucher) {
    this.modal = await this.modalController.create({
      component: TransferRewardsPage,
      componentProps: {"voucherId": voucher.id,
      "code": voucher.code, 
      "voucherTitle": voucher.rewardTitle, 
      "voucherDesc": voucher.rewardDesc, 
      "voucherImg":  voucher.rewardImgPath,
      "claimedAt": voucher.claimedAt,
      "endDate": voucher.endDate}
      
    });
    this.modal.onWillDismiss().then((data) => {
  });
    return await this.modal.present();
  }
}
