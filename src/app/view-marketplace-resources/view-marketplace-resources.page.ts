import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../services/marketplace.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-view-marketplace-resources',
  templateUrl: './view-marketplace-resources.page.html',
  styleUrls: ['./view-marketplace-resources.page.scss'],
})
export class ViewMarketplaceResourcesPage implements OnInit {
  manpowerResource : any[];
  knowledgeResource : any[]
  itemResource : any[];
  venueResource : any[];
  type : String;
  user:  any;
  currentUser: any;
  noKnowledgeResourceBoolean: boolean;
  noItemResourceBoolean: boolean;
  noVenueResourceBoolean: boolean;
  noManpowerResourceBoolean: boolean;
  // isFilterAll : boolean;
  manpowerResourceList: any[];
  knowledgeResourceList : any[]
  itemResourceList : any[];
  venueResourceList : any[];
  
  constructor(private marketplaceService: MarketplaceService, private tokenStorage: TokenStorageService, private sessionService: SessionService, private router: Router) {
    this.currentUser = this.tokenStorage.getUser();
    this.type = "manpower";
    // this.isFilterAll = true;
   }

  ngOnInit() {
    this.initialise();
  }

  ionViewDidEnter() {
    this.initialise();
  }

  initialiseData() {
    this.manpowerResourceList = this.manpowerResource;
    this.knowledgeResourceList = this.knowledgeResource;
    this.itemResourceList = this.itemResource;
    this.venueResourceList = this.venueResource;
  }

  initialise() {
    this.marketplaceService.getManpowerOffer().subscribe((res) =>{
      this.manpowerResource = res.data.manpowers;
      if(this.manpowerResource != undefined) {
        this.noManpowerResourceBoolean = false;
        for(var i = 0; i < this.manpowerResource.length; i++) {
          this.manpowerResource[i].ownerImg = this.sessionService.getRscPath() + this.manpowerResource[i].ownerImg  +'?random+=' + Math.random();
        }
      } else {
        this.noManpowerResourceBoolean = true;
      }

      this.manpowerResourceList = this.manpowerResource;
      // this.manpowerResourceList = this.manpowerResource.sort(function (a, b) {
      //   return a.updatedAt.localeCompare(b.updatedAt);
      // }).reverse();
    }),
    err => {
      console.log('****** View Marketplace Manpower.ts: ', err.error.msg);
    }

    this.marketplaceService.getKnowledgeOffer().subscribe((res) =>{
      this.knowledgeResource = res.data.knowledges;
      console.log(this.knowledgeResource);
      if(this.knowledgeResource != undefined) {
        this.noKnowledgeResourceBoolean = false;
        for(var i = 0; i < this.knowledgeResource.length; i++) {
          this.knowledgeResource[i].ownerImg = this.sessionService.getRscPath() + this.knowledgeResource[i].ownerImg  +'?random+=' + Math.random();
        }
      } else {
        this.noKnowledgeResourceBoolean = true;
      }

      this.knowledgeResourceList = this.knowledgeResource;
    }),
    err => {
      console.log('****** View Marketplace Knowledge.ts: ', err.error.msg);
    }

    this.marketplaceService.getItemOffer().subscribe((res) =>{
      this.itemResource = res.data.items;
      if(this.itemResource != undefined) {
        this.noItemResourceBoolean = false;
        for(var i = 0; i < this.itemResource.length; i++) {
          this.itemResource[i].ownerImg = this.sessionService.getRscPath() + this.itemResource[i].ownerImg  +'?random+=' + Math.random();
          this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath + '?random+=' + Math.random();
        }
      } else {
        this.noItemResourceBoolean = true;
      }

      this.itemResourceList = this.itemResource;
    }),
    err => {
      console.log('****** View Marketplace Item.ts: ', err.error.msg);
    }

    this.marketplaceService.getVenueOffer().subscribe((res) =>{
      this.venueResource = res.data.venues;
      if(this.venueResource != undefined) {
        this.noVenueResourceBoolean = false;
        for(var i = 0; i < this.venueResource.length; i++) {
          this.venueResource[i].ownerImg = this.sessionService.getRscPath() + this.venueResource[i].ownerImg  +'?random+=' + Math.random();
          if(this.venueResource[i].imgPath.length > 0) {
            this.venueResource[i].imgPath[0] = this.sessionService.getRscPath() + this.venueResource[i].imgPath[0] + '?random+=' + Math.random();
          }
        }
      } else {
        this.noVenueResourceBoolean = true;
      }

      this.venueResourceList = this.venueResource;
    }),
    err => {
      console.log('****** View Marketplace Venue.ts: ', err.error.msg);
    }
  }

  viewFounderProfile(ev, h) {
    if(h.owner == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      
      if(h.ownerType == "institution") {
        this.router.navigate(['/view-others-profile/' + h.ownerUsername + "/" + h.ownerType ])
      } else if(h.hostType == "user") {
        this.router.navigate(['/view-others-profile/' + h.ownerUsername + "/" + h.ownerType ])
      }
      
    }
  }

  async filterList(evt) {
    // this.initialiseFilter();
    this.initialiseData();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
  
    if(this.noManpowerResourceBoolean == false) {
      this.manpowerResourceList = this.manpowerResourceList.filter( manpowerRes => {
        if (manpowerRes.title && searchTerm) {
          return (manpowerRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
          || (manpowerRes.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }

    if(this.noKnowledgeResourceBoolean == false){
      this.knowledgeResourceList = this.knowledgeResourceList.filter( knowledgeRes => {
        if (knowledgeRes.title && searchTerm) {
          return (knowledgeRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }

    if(this.noItemResourceBoolean == false) {
      this.itemResourceList = this.itemResourceList.filter( itemRes => {
        if (itemRes.title && searchTerm) {
          return (itemRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
          || (itemRes.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }

    if(this.noVenueResourceBoolean == false) {
      this.venueResourceList = this.venueResourceList.filter( venueRes => {
        if (venueRes.title && searchTerm) {
          return (venueRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
          || (venueRes.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }
  }

  viewResource(resource) {
    this.router.navigateByUrl("/view-resource/" + this.type + "/" + resource.id);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
