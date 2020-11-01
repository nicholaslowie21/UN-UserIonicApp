import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, 
    private sessionService: SessionService, 
    private tokenStorage: TokenStorageService,
    private rewardsService: RewardsService,
    private userService: UserService,
    private institutionService: InstitutionService, private activatedRoute: ActivatedRoute) {

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


}
