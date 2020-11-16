import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateReportPage } from '../report/create-report/create-report.page';
import { InstitutionService } from '../services/institution.service';
import { RewardsService } from '../services/rewards.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-marketplace-reward-details',
  templateUrl: './view-marketplace-reward-details.page.html',
  styleUrls: ['./view-marketplace-reward-details.page.scss'],
})
export class ViewMarketplaceRewardDetailsPage implements OnInit {
  accountType: any;
  currentUser: any;
  accountBoolean: boolean;
  rewardId: any;
  id: any;
  reward: any;
  imgPath: string;
  accountImgPath: string;
  modal: any;

  constructor(private router: Router, 
    private sessionService: SessionService, 
    private tokenStorage: TokenStorageService,
    private rewardsService: RewardsService,
    private userService: UserService,
    private institutionService: InstitutionService, 
    private activatedRoute: ActivatedRoute,
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
      console.log("****************View Marketplace Reward Details error: " + err.error.msg)
    })
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  redeem() {
    this.router.navigate(["/redeem-reward/" + this.reward.id]);
  }

  async report() {
    this.modal = await this.modalController.create({
      component: CreateReportPage,
      componentProps: {"targetId": this.rewardId, "type": "reward", "name": this.reward.title}
    });
    return await this.modal.present();
  }

  viewFounderProfile(ev, h) {
    var username = "";
    if(h.id == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      
      if(h.sponsorType == "institution" || h.sponsorType=="user") {
        this.router.navigate(['/view-others-profile/' + h.accountUsername + "/" + h.sponsorType ])
      }
      // if(h.sponsorType == "institution") {
      //     this.institutionService.viewInstitutionById(h.sponsorId).subscribe((res) => {
      //       username = res.data.targetInstitution.username
      //       this.router.navigate(['/view-others-profile/' + username + "/" + h.hostType ])
      //     }, (err) => {
      //       console.log("View Founder Profile error: " + err.error.msg);
      //     })
      // } else if(h.hostType == "user") {
      //   this.userService.viewUserById(h.host).subscribe((res) => {
      //     username = res.data.targetUser.username
      //     this.router.navigate(['/view-others-profile/' + username + "/" + h.hostType ])
      //   }, (err) => {
      //     console.log("View Founder Profile error: " + err.error.msg);
      //   })
      // }
      
    }
  }
}