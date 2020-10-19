import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateMoneyRequestPage } from 'src/app/funding/create-money-request/create-money-request.page';
import { InstitutionService } from 'src/app/services/institution.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-funding-needs',
  templateUrl: './view-funding-needs.page.html',
  styleUrls: ['./view-funding-needs.page.scss'],
})
export class ViewFundingNeedsPage implements OnInit {
  fundingNeedsList: any;
  fundingNeeds: any;
  sdgFilterBoolean: boolean;
  sdgs: any;
  sdgsList: { id: number; }[];
  accountBoolean: boolean;
  accountType: any;
  user: any;
  modal: HTMLIonModalElement;
  needId: any;
  filterData: { filterSDGs: any; };

  constructor(private marketplaceService: MarketplaceService, 
    private sessionService: SessionService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private institutionService: InstitutionService,
    private modalController: ModalController) {
    this.accountType = this.tokenStorage.getAccountType();
    this.user = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
   }

  ngOnInit() {
    this.sdgsList = [{"id":1},{"id":2}, {"id":3},
    {"id":4}, {"id":5},{"id":6},
    {"id":7}, {"id":8},{"id":9},
    {"id":10}, {"id":11}, {"id":12},
    {"id":13}, {"id":14}, {"id":15},
    {"id":16},{"id":17}]
    this.initialise();
    this.initializeLists();
  }

  ionViewDidEnter() {
    this.initialise();
    this.initializeLists();
  }

  initialise() {
    this.marketplaceService.viewFundingNeeds().subscribe((res) => {
      this.fundingNeeds = res.data.fundings;
      console.log("res" + JSON.stringify(res.data.fundings));
      if(this.fundingNeeds != undefined) {
        for(var i = 0; i < this.fundingNeeds.length; i ++) {
          this.fundingNeeds[i].imgPath = this.sessionService.getRscPath() + this.fundingNeeds[i].imgPath +'?random+=' + Math.random();
          this.fundingNeeds[i].ownerImg = this.sessionService.getRscPath() + this.fundingNeeds[i].ownerImg + '?random+=' + Math.random();

        }
        this.initializeLists();
      }
    }, (err) => {
      console.log("******************View Funding needs(Retrieve funding needs error: " + err.error.msg);
    })
  }

  reset() {
    this.sdgs = null;
    this.initializeLists();
  }

  initializeLists() {
    this.fundingNeedsList = this.fundingNeeds;
  }

  viewFounderProfile(ev, h) {
    var username = "";

    if(h.owner == this.user.data.user.id) {
      console.log("work");
      this.router.navigateByUrl("/tabs/profile");
    } else {
      
      if(h.ownerType == "institution") {
          this.institutionService.viewInstitutionById(h.owner).subscribe((res) => {
            username = res.data.targetInstitution.username
            this.router.navigate(['/view-others-profile/' + username + "/" + h.ownerType ])
          }, (err) => {
            console.log("View Founder Profile error: " + err.error.msg);
          })
      } else if(h.ownerType == "user") {
        this.userService.viewUserById(h.owner).subscribe((res) => {
          username = res.data.targetUser.username
          this.router.navigate(['/view-others-profile/' + username + "/" + h.ownerType ])
        }, (err) => {
          console.log("View Founder Profile error: " + err.error.msg);
        })
      }
      
    }
  }
  
   async filterFundingsNeedsList(evt) {
    if(this.sdgFilterBoolean != true) {
      this.initializeLists();
      this.reset();
    }
    this.sdgFilterBoolean = false;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.fundingNeedsList = this.fundingNeedsList.filter(fundingneed => {
      if (fundingneed.title && searchTerm) {
        return (fundingneed.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (fundingneed.ownerName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) 
        || (fundingneed.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  filterSDGS(sdgs) {
    this.sdgFilterBoolean = true;
    this.filterData = {
      "filterSDGs": sdgs
    }
    this.marketplaceService.getFilteredOngoingProjects(this.filterData).subscribe((res) => {
      this.fundingNeedsList = res.data.projects;
    }, (err) => {
      console.log("****************View Marketplace Projects(filterSDGs).page.ts error: " + err.error.msg);
    })
  }

  async contribute(resource) {
    this.modal = await this.modalController.create({
      component: CreateMoneyRequestPage,
      componentProps: {"resource": resource, "needId": resource.needId}
      
    });
    this.modal.onDidDismiss().then((data) => {
      this.initialise();
  });
    return await this.modal.present();
  }

  viewProject(ev, p) {
    this.router.navigate(['/view-market-project-details/' + p.id]);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }
}
