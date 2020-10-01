import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ResourceService } from '../services/resource.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-others-resources',
  templateUrl: './view-others-resources.page.html',
  styleUrls: ['./view-others-resources.page.scss'],
})
export class ViewOthersResourcesPage implements OnInit {

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
  id: string;
  manpowerResourceList: any[];
  knowledgeResourceList: any[];
  itemResourceList: any[];
  venueResourceList: any[];

  constructor(private userService: UserService, private navCtrl: NavController, private activatedRoute: ActivatedRoute, private resourceService: ResourceService, private tokenStorage: TokenStorageService, private sessionService: SessionService, private router: Router) {
    this.accountType = this.tokenStorage.getViewId().accountType;
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.tokenStorage.saveViewId(this.id);
        this.user = this.tokenStorage.getUser();
      console.log(this.accountType);
        if(this.accountType == "institution") {
          this.accountBoolean = true;
        } else if(this.accountType == "user") {
          this.accountBoolean = false;
        }
    this.type = "manpower";
   }

  ngOnInit() {
    this.initialiseA();
    this.initialiseData();
  }
  
  ionViewDidEnter() {
    this.initialiseA();
    this.initialiseData();
  }

  initialiseData() {
    this.manpowerResourceList = this.manpowerResource;
    this.knowledgeResourceList = this.knowledgeResource;
    this.itemResourceList = this.itemResource;
    this.venueResourceList = this.venueResource;
  }

  initialise() {
    if(this.accountBoolean == true)
    {
      this.resourceService.getInstitutionPrivateKnowledgeResource().subscribe((res) => {
        this.knowledgeResource = res.data.knowledges;
        if(this.knowledgeResource.length > 0) {
          this.noKnowledgeResourceBoolean = false;
        } else {
            this.noKnowledgeResourceBoolean = true;
        }
        this.knowledgeResourceList = this.knowledgeResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }),
      err => {
        console.log('********** Knowledge Resource (institution).ts: ', err.error.msg);
      }

      this.resourceService.getInstitutionPrivateItemResource().subscribe((res) => {
        this.itemResource = res.data.items;
        if(this.itemResource.length > 0) {
          this.noItemResourceBoolean = false;
          for(var i = 0; i < this.itemResource.length; i++) {
            this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
            this.noItemResourceBoolean = true;
        }

        this.itemResourceList = this.itemResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }
      ),
      err => {
        console.log('********** Item Resource (institution).ts: ', err.error.msg);
      };

      this.resourceService.getInstitutionPrivateVenueResource().subscribe((res) => {
        this.venueResource = res.data.venues
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

        this.venueResourceList = this.venueResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }),
      
      err => {
        console.log('********** Venue Resource (institution).ts: ', err.error.msg);
      };

  } else if(this.accountBoolean == false) {
        this.resourceService.getUserPrivateKnowledgeResource().subscribe((res) => {
        this.knowledgeResource = res.data.knowledges
        if(this.knowledgeResource.length > 0) {
          this.noKnowledgeResourceBoolean = false;
        } else {
            this.noKnowledgeResourceBoolean = true;
        }

        this.knowledgeResourceList = this.knowledgeResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }),
      err => {
        console.log('********** Knowledge Resource (user).ts: ', err.error.msg);
      }

      this.resourceService.getUserPrivateItemResource().subscribe((res) => {
      this.itemResource = res.data.items;
      if(this.itemResource.length > 0) {
        this.noItemResourceBoolean = false;
        for(var i = 0; i < this.itemResource.length; i++) {
          this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
        }
      } else {
          this.noItemResourceBoolean = true;
      }

      this.itemResourceList = this.itemResource.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
      }),
      err => {
        console.log('********** Item Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserPrivateVenueResource().subscribe((res) => {
      this.venueResource = res.data.venues;
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

      this.venueResourceList = this.venueResource.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
    
      }),
      err => {
        console.log('********** Venue Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserPrivateManpowerResource().subscribe((res) => {
      this.manpowerResource = res.data.manpowers;
      if(this.manpowerResource.length > 0) {
        this.noManpowerResourceBoolean = false;
        this.manpowerImgPath = this.sessionService.getRscPath() + this.tokenStorage.getViewId().ionicImg  +'?random+=' + Math.random();
        console.log(this.manpowerImgPath);
      } else {
          this.noManpowerResourceBoolean = true;
      }

      this.manpowerResourceList = this.manpowerResource.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
    
      }),
      err => {
        console.log('********** Manpower Resource (user).ts: ', err.error.msg);
      };
  }
  }

  filter() {
    this.initialiseA();
  }

  initialiseA() {
    if(this.accountBoolean == true)
    {
      this.resourceService.getInstitutionKnowledgeResource(this.id).subscribe((res) => {
        this.knowledgeResource = res.data.knowledges;
        if(this.knowledgeResource.length > 0) {
          this.noKnowledgeResourceBoolean = false;
          for(var i = 0; i < this.knowledgeResource.length; i++) {
            this.knowledgeResource[i].imgPath = this.sessionService.getRscPath() + this.knowledgeResource[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
            this.noKnowledgeResourceBoolean = true;
        }

        this.knowledgeResourceList = this.knowledgeResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }),
      err => {
        console.log('********** Knowledge Resource (institution).ts: ', err.error.msg);
      }

      this.resourceService.getInstitutionItemResource(this.id).subscribe((res) => {
        this.itemResource = res.data.items;
        if(this.itemResource.length > 0) {
          this.noItemResourceBoolean = false;
          for(var i = 0; i < this.itemResource.length; i++) {
            this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
            this.noItemResourceBoolean = true;
        }

        this.itemResourceList = this.itemResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }
      ),
      err => {
        console.log('********** Item Resource (institution).ts: ', err.error.msg);
      };

      this.resourceService.getInstitutionVenueResource(this.id).subscribe((res) => {
        this.venueResource = res.data.venues
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

        this.venueResourceList = this.venueResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }),
      
      err => {
        console.log('********** Venue Resource (institution).ts: ', err.error.msg);
      };

  } else if(this.accountBoolean == false) {
        this.resourceService.getUserKnowledgeResource(this.id).subscribe((res) => {
        this.knowledgeResource = res.data.knowledges
        if(this.knowledgeResource.length > 0) {
          this.noKnowledgeResourceBoolean = false; 
        } else {
            this.noKnowledgeResourceBoolean = true;
        }

        this.knowledgeResourceList = this.knowledgeResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }),
      err => {
        console.log('********** Knowledge Resource (user).ts: ', err.error.msg);
      }

      this.resourceService.getUserItemResource(this.id).subscribe((res) => {
      this.itemResource = res.data.items;
      if(this.itemResource.length > 0) {
        this.noItemResourceBoolean = false;
        for(var i = 0; i < this.itemResource.length; i++) {
          this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
        }
      } else {
          this.noItemResourceBoolean = true;
      }

      this.itemResourceList = this.itemResource.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
      }),
      err => {
        console.log('********** Item Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserVenueResource(this.id).subscribe((res) => {
      this.venueResource = res.data.venues;
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

      this.venueResourceList = this.venueResource.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
    
      }),
      err => {
        console.log('********** Venue Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserManpowerResource(this.id).subscribe((res) => {
      this.manpowerResource = res.data.manpowers;
      if(this.manpowerResource.length > 0) {
        this.noManpowerResourceBoolean = false;
        this.userService.viewUserById(this.id).subscribe((res) => {
          this.manpowerImgPath = this.sessionService.getRscPath() + res.data.targetUser.ionicImg  +'?random+=' + Math.random();
          console.log(this.manpowerImgPath);
        }, (err) => {
          console.log("Retrieve owner error(manpower): " + err.error.msg)
        })
        
        console.log(this.manpowerImgPath);
        /*for(var i = 0; i < this.manpowerResource.length; i++) {
          this.manpowerResource[i]['imgPath'] = this.sessionService.getRscPath() + this.tokenStorage.getViewId().ionicImg  +'?random+=' + Math.random();
        }*/
      } else {
          this.noManpowerResourceBoolean = true;
      }

      this.manpowerResourceList = this.manpowerResource.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
    
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

  pop() {
    this.navCtrl.pop();
  }

}
