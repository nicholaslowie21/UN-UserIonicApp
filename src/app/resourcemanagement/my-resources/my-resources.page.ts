import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-my-resources',
  templateUrl: './my-resources.page.html',
  styleUrls: ['./my-resources.page.scss'],
})
export class MyResourcesPage implements OnInit {
  manpowerResource : any[];
  knowledgeResource : any[]
  itemResource : any[];
  venueResource : any[];
  type : String;
  accountType: any;
  user: any;
  manpowerImgPath: any;
  accountBoolean: boolean;
  noKnowledgeResourceBoolean: boolean;
  noItemResourceBoolean: boolean;
  noVenueResourceBoolean: boolean;
  noManpowerResourceBoolean: boolean;
  isFilterAll : boolean;
  manpowerResourceList: any[];
  knowledgeResourceList : any[]
  itemResourceList : any[];
  venueResourceList : any[];


  constructor(private resourceService: ResourceService, private tokenStorage: TokenStorageService, private sessionService: SessionService, private router: Router) {
    this.accountType = this.tokenStorage.getAccountType();
        this.user = this.tokenStorage.getUser();
      console.log(this.accountType);
        if(this.accountType == "institution") {
          this.accountBoolean = true;
        } else if(this.accountType == "user") {
          this.accountBoolean = false;
        }
    this.type = "manpower";
    this.isFilterAll = true;
  }

  ngOnInit() {
    this.initialiseFilter();
  }
  
  ionViewDidEnter() {
    this.initialiseFilter();
  }
  
  initialiseFilter() {
    console.log(this.isFilterAll);
    if(this.isFilterAll == true) {
      this.initialiseAll();
    } else {
      this.initialiseActiveOnly();
    }
  }

  initialiseData() {
    this.manpowerResourceList = this.manpowerResource;
    this.knowledgeResourceList = this.knowledgeResource;
    this.itemResourceList = this.itemResource;
    this.venueResourceList = this.venueResource;
  }

  filter() {
    if (this.isFilterAll == false) {
      this.isFilterAll = true;
      this.initialiseFilter();

    } else {
      this.isFilterAll = false;
      this.initialiseFilter();
    }
  }

  initialiseAll() {
    console.log("I am initialise ALl");
    if(this.accountBoolean == true)
    {
      this.resourceService.getInstitutionPrivateKnowledgeResource().subscribe((res) => {
         
          this.knowledgeResource = res.data.knowledges;
          this.knowledgeResourceList = this.knowledgeResource;
          if(this.knowledgeResource.length > 0) {
            this.noKnowledgeResourceBoolean = false;
          } else {
              this.noKnowledgeResourceBoolean = true;
          }
        }),
      err => {
        console.log('********** Knowledge Resource (institution).ts: ', err.error.msg);
      }

      this.resourceService.getInstitutionPrivateItemResource().subscribe((res) => {
        this.itemResource = res.data.items;
        this.itemResourceList = this.itemResource;
        if(this.itemResource.length > 0) {
          this.noItemResourceBoolean = false;
          for(var i = 0; i < this.itemResource.length; i++) {
            this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
            this.noItemResourceBoolean = true;
        }
      }
      ),
      err => {
        console.log('********** Item Resource (institution).ts: ', err.error.msg);
      };

      this.resourceService.getInstitutionPrivateVenueResource().subscribe((res) => {
        this.venueResource = res.data.venues
        this.venueResourceList = this.venueResource;
        if(this.venueResource.length > 0) {
          this.noVenueResourceBoolean = false;
          for(var i = 0; i < this.venueResource.length; i++) {
            if(this.venueResource[i].imgPath.length > 0) {
                this.venueResource[i].imgPath[0] = this.sessionService.getRscPath() + this.venueResource[i].imgPath[0]  +'?random+=' + Math.random();
            }
          }
        } else {
            this.noVenueResourceBoolean = true;
        }
      }),
      
      err => {
        console.log('********** Venue Resource (institution).ts: ', err.error.msg);
      };

  } else if(this.accountBoolean == false) {
        this.resourceService.getUserPrivateKnowledgeResource().subscribe((res) => {
        this.knowledgeResource = res.data.knowledges;
        this.knowledgeResourceList = this.knowledgeResource;
        if(this.knowledgeResource.length > 0) {
          this.noKnowledgeResourceBoolean = false;
        } else {
            this.noKnowledgeResourceBoolean = true;
        }
      }),
      err => {
        console.log('********** Knowledge Resource (user).ts: ', err.error.msg);
      }

      this.resourceService.getUserPrivateItemResource().subscribe((res) => {
      this.itemResource = res.data.items;
      this.itemResourceList = this.itemResource;
      if(this.itemResource.length > 0) {
        this.noItemResourceBoolean = false;
        for(var i = 0; i < this.itemResource.length; i++) {
          this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
        }
      } else {
          this.noItemResourceBoolean = true;
      }
      }),
      err => {
        console.log('********** Item Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserPrivateVenueResource().subscribe((res) => {
      this.venueResource = res.data.venues;
      this.venueResourceList = this.venueResource;
      if(this.venueResource.length > 0) {
        this.noVenueResourceBoolean = false;
        for(var i = 0; i < this.venueResource.length; i++) {
          if(this.venueResource[i].imgPath.length > 0) {
              this.venueResource[i].imgPath[0] = this.sessionService.getRscPath() + this.venueResource[i].imgPath[0]  +'?random+=' + Math.random();
          }
        }
      } else {
          this.noVenueResourceBoolean = true;
      }
    
      }),
      err => {
        console.log('********** Venue Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserPrivateManpowerResource().subscribe((res) => {
      this.manpowerResource = res.data.manpowers;
      this.manpowerResourceList = this.manpowerResource;
      if(this.manpowerResource.length > 0) {
        this.noManpowerResourceBoolean = false;
        this.manpowerImgPath = this.sessionService.getRscPath() + this.user.data.user.ionicImg  +'?random+=' + Math.random();
        console.log(this.manpowerImgPath);
      } else {
          this.noManpowerResourceBoolean = true;
      }
    
      }),
      err => {
        console.log('********** Manpower Resource (user).ts: ', err.error.msg);
      };
  }
  }

  initialiseActiveOnly() {
    console.log("I am at active only");
    if(this.accountBoolean == true)
    {
      this.resourceService.getInstitutionKnowledgeResource(this.user.data.user.id).subscribe((res) => {
        this.knowledgeResource = res.data.knowledges;
        this.knowledgeResourceList = this.knowledgeResource;
        if(this.knowledgeResource.length > 0) {
          this.noKnowledgeResourceBoolean = false;
          for(var i = 0; i < this.knowledgeResource.length; i++) {
            this.knowledgeResource[i].imgPath = this.sessionService.getRscPath() + this.knowledgeResource[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
            this.noKnowledgeResourceBoolean = true;
        }
      }),
      err => {
        console.log('********** Knowledge Resource (institution).ts: ', err.error.msg);
      }

      this.resourceService.getInstitutionItemResource(this.user.data.user.id).subscribe((res) => {
        this.itemResource = res.data.items;
        this.itemResourceList = this.itemResource;
        if(this.itemResource.length > 0) {
          this.noItemResourceBoolean = false;
          for(var i = 0; i < this.itemResource.length; i++) {
            this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
            this.noItemResourceBoolean = true;
        }
      }
      ),
      err => {
        console.log('********** Item Resource (institution).ts: ', err.error.msg);
      };

      this.resourceService.getInstitutionVenueResource(this.user.data.user.id).subscribe((res) => {
        this.venueResource = res.data.venues
        this.venueResourceList = this.venueResource;
        if(this.venueResource.length > 0) {
          this.noVenueResourceBoolean = false;
          for(var i = 0; i < this.venueResource.length; i++) {
            if(this.venueResource[i].imgPath.length > 0) {
                this.venueResource[i].imgPath[0] = this.sessionService.getRscPath() + this.venueResource[i].imgPath[0]  +'?random+=' + Math.random();
            }
          }
        } else {
            this.noVenueResourceBoolean = true;
        }
      }),
      
      err => {
        console.log('********** Venue Resource (institution).ts: ', err.error.msg);
      };

  } else if(this.accountBoolean == false) {
        this.resourceService.getUserKnowledgeResource(this.user.data.user.id).subscribe((res) => {
        this.knowledgeResource = res.data.knowledges
        this.knowledgeResourceList = this.knowledgeResource;
        if(this.knowledgeResource.length > 0) {
          this.noKnowledgeResourceBoolean = false; 
        } else {
            this.noKnowledgeResourceBoolean = true;
        }
      }),
      err => {
        console.log('********** Knowledge Resource (user).ts: ', err.error.msg);
      }

      this.resourceService.getUserItemResource(this.user.data.user.id).subscribe((res) => {
      this.itemResource = res.data.items;
      this.itemResourceList = this.itemResource;
      if(this.itemResource.length > 0) {
        this.noItemResourceBoolean = false;
        for(var i = 0; i < this.itemResource.length; i++) {
          this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
        }
      } else {
          this.noItemResourceBoolean = true;
      }
      }),
      err => {
        console.log('********** Item Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserVenueResource(this.user.data.user.id).subscribe((res) => {
      this.venueResource = res.data.venues;
      this.venueResourceList = this.venueResource;
      if(this.venueResource.length > 0) {
        this.noVenueResourceBoolean = false;
        for(var i = 0; i < this.venueResource.length; i++) {
          if(this.venueResource[i].imgPath.length > 0) {
              this.venueResource[i].imgPath[0] = this.sessionService.getRscPath() + this.venueResource[i].imgPath[0]  +'?random+=' + Math.random();
          }
        }
      } else {
          this.noVenueResourceBoolean = true;
      }
    
      }),
      err => {
        console.log('********** Venue Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserManpowerResource(this.user.data.user.id).subscribe((res) => {
      this.manpowerResource = res.data.manpowers;
      this.manpowerResourceList = this.manpowerResource;
      if(this.manpowerResource.length > 0) {
        this.noManpowerResourceBoolean = false;
        for(var i = 0; i < this.manpowerResource.length; i++) {
          this.manpowerResource[i].imgPath = this.sessionService.getRscPath() + this.manpowerResource[i].imgPath  +'?random+=' + Math.random();
        }
      } else {
          this.noManpowerResourceBoolean = true;
      }
    
      }),
      err => {
        console.log('********** Manpower Resource (user).ts: ', err.error.msg);
      };
  }
  }

  async filterList(evt) {
    // this.initialiseFilter();
    this.initialiseData();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
  
    this.manpowerResourceList = this.manpowerResourceList.filter( manpowerRes => {
      if (manpowerRes.title && searchTerm) {
        return (manpowerRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
    this.knowledgeResourceList = this.knowledgeResourceList.filter( knowledgeRes => {
      if (knowledgeRes.title && searchTerm) {
        return (knowledgeRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
    this.itemResourceList = this.itemResourceList.filter( itemRes => {
      if (itemRes.title && searchTerm) {
        return (itemRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });

    this.venueResourceList = this.venueResourceList.filter( venueRes => {
      if (venueRes.title && searchTerm) {
        return (venueRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  viewResource(resource) {
    this.router.navigateByUrl("/view-resource/" + this.type + "/" + resource.id);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
