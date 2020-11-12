import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { RewardsService } from '../services/rewards.service';
import { UserService } from '../services/user.service';
import { InstitutionService } from '../services/institution.service';

@Component({
  selector: 'app-view-marketplace-rewards',
  templateUrl: './view-marketplace-rewards.page.html',
  styleUrls: ['./view-marketplace-rewards.page.scss'],
})
export class ViewMarketplaceRewardsPage implements OnInit {
  rewardsList: any;
  accountType: any;
  currentUser: any;
  accountBoolean: boolean;
  tierList: { tier: string; }[];
  filterList: any;
  tierFilterBoolean: boolean;
  tier: any;

  constructor(private router: Router, 
    private sessionService: SessionService, 
    private tokenStorage: TokenStorageService,
    private rewardsService: RewardsService,
    private userService: UserService,
    private institutionService: InstitutionService) {
      this.accountType = this.tokenStorage.getAccountType();
    this.currentUser = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
     }

  ionViewDidEnter() {
      this.initialiseRewards();
  }

  ngOnInit() {
    this.tierList = [
      {"tier": "bronze"},
      {"tier": "silver"},
      {"tier": "gold"}
    ];
    this.initialise();
    this.initialiseRewards();
  }

  initialise() {
    this.rewardsService.getRewardMarketplace().subscribe((res) => {
      this.rewardsList = res.data.rewards;
      if(this.rewardsList != undefined) {
        for(var i = 0; i < this.rewardsList.length; i ++) {
          this.rewardsList[i].imgPath = this.sessionService.getRscPath() + this.rewardsList[i].imgPath +'?random+=' + Math.random();
          this.rewardsList[i].accountImgPath = this.sessionService.getRscPath() + this.rewardsList[i].accountImgPath + '?random+=' + Math.random();
        }
      }
    }, (err) => {
        console.log("****************View Marketplace Rewards.page.ts error: " + err.error.msg);
    })
  }

  initialiseRewards() {
    this.filterList = this.rewardsList;
  }

  reset() {
    this.tier = null;
    this.initialiseRewards();
    this.tierList = [
      {"tier": "bronze"},
      {"tier": "silver"},
      {"tier": "gold"}
    ];
  }

  filterTiers(tier) {
    this.tierFilterBoolean = true;
    this.rewardsService.getFilteredMarketplaceReward(this.tier).subscribe((res) => {
      this.filterList = res.data.rewards;
      if(this.filterList != undefined) {
        for(var i = 0; i < this.filterList.length; i ++) {
          this.filterList[i].imgPath = this.sessionService.getRscPath() + this.filterList[i].imgPath +'?random+=' + Math.random();
          this.filterList[i].accountImgPath = this.sessionService.getRscPath() + this.filterList[i].accountImgPath + '?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("****************View Marketplace Projects(filterSDGs).page.ts error: " + err.error.msg);
    })
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  viewSponsorProfile(ev, h) {
      if(h.sponsorType != "external") {
          var username = "";
          if(h.sponsorId == this.currentUser.data.user.id) {
            this.router.navigateByUrl("/tabs/profile");
          } else {
            
            if(h.sponsorType == "institution") {
                this.institutionService.viewInstitutionById(h.sponsorId).subscribe((res) => {
                  username = res.data.targetInstitution.username
                  this.router.navigate(['/view-others-profile/' + username + "/" + h.sponsorType ])
                }, (err) => {
                  console.log("View Founder Profile error: " + err.error.msg);
                })
            } else if(h.sponsorType == "user") {
              this.userService.viewUserById(h.sponsorId).subscribe((res) => {
                username = res.data.targetUser.username
                this.router.navigate(['/view-others-profile/' + username + "/" + h.sponsorType ])
              }, (err) => {
                console.log("View Founder Profile error: " + err.error.msg);
              })
            }
      
          }
      }
  }

  async filterRewardsList(evt) {
    
    this.tierFilterBoolean = false;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.filterList = this.filterList.filter(reward => {
      if (reward.title && searchTerm) {
        return (reward.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (reward.accountName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) 
        || (reward.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
      if(this.tierFilterBoolean != true) {
        this.initialiseRewards();
        this.reset();
      }
    });
  }

  viewDetails(reward) {
    this.router.navigate(["/view-marketplace-reward-details/" + reward.id]);
  }

}
