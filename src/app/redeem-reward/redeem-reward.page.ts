import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { RewardConfirmationPage } from '../reward-confirmation/reward-confirmation.page';
import { InstitutionService } from '../services/institution.service';
import { RewardsService } from '../services/rewards.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-redeem-reward',
  templateUrl: './redeem-reward.page.html',
  styleUrls: ['./redeem-reward.page.scss'],
})
export class RedeemRewardPage implements OnInit {
  accountType: any;
  currentUser: any;
  accountBoolean: boolean;
  rewardId: string;
  id: any;
  reward: any;
  imgPath: string;
  accountImgPath: string;
  data: {};
  modal: HTMLIonModalElement;

  constructor(private router: Router, 
    private sessionService: SessionService, 
    private tokenStorage: TokenStorageService,
    private rewardsService: RewardsService,
    private userService: UserService,
    private institutionService: InstitutionService, 
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private modalController: ModalController,
    private navCtrl: NavController) {

      this.accountType = this.tokenStorage.getAccountType();
    this.currentUser = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
     }

  ngOnInit() {
    this.rewardId = this.activatedRoute.snapshot.paramMap.get('Id');
    this.currentUser = this.tokenStorage.getUser();
    this.id = this.currentUser.data.user.id;
    this.initialise();
  }
  initialise() {
    this.reward = this.rewardsService.getMarketplaceRewardDetails(this.rewardId).subscribe((res)=> {
      this.reward = res.data.reward;
      this.imgPath = this.sessionService.getRscPath() + res.data.reward.imgPath +'?random+=' + Math.random();
      this.accountImgPath = this.sessionService.getRscPath() + res.data.reward.accountImgPath +'?random+=' + Math.random();
  }, (err) => {
    console.log("****************Redeem Rewards error: " + err.error.msg)
  })
  }

  redeemRewards() {
    this.data = {
      "id": this.rewardId
    }

    this.rewardsService.redeemReward(this.data).subscribe((res)=>{
      this.successToast();
      this.completed(res);
    }, (err) => {
      console.log("****************Redeem Rewards error: " + err.error.msg);
      this.failureToast(err.error.msg);
    })
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Redeemed Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
  
  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Redeemed successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async confirmRedeemReward(event, resource)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to spend ' + this.reward.point + ' points to redeem this reward?',
			message: 'Confirm redeem reward?',
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
				this.redeemRewards();
			  }
			}
			]
		});

		await alert.present(); 
  }

  async completed(response) {
    this.modal = await this.modalController.create({
      component: RewardConfirmationPage,
      componentProps: {"msg": response.msg, "code": response.data.voucher.code, "claimedAt": response.data.voucher.createdAt, "endDate": response.data.voucher.endDate}
      
    });
    this.modal.onWillDismiss().then((data) => {
  });
    return await this.modal.present();
  }

  backNav() {
    this.navCtrl.pop();
  }

}
