import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from  "@angular/router";
import { PaidresourceService } from 'src/app/services/paidresource.service';

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
  viewEntered: boolean = false;
  noVenuePicBoolean: boolean;
  noItemPicBoolean: boolean;
  paidResource: any;
  paidResourceList: any;
  noPaidResourceBoolean: boolean;
  noPaidResourcePicBoolean: boolean;


  constructor(private resourceService: ResourceService, 
    private tokenStorage: TokenStorageService, 
    private sessionService: SessionService, 
    private router: Router,
    private paidService: PaidresourceService) {
    this.accountType = this.tokenStorage.getAccountType();
        this.user = this.tokenStorage.getUser();
      console.log(this.accountType);
        if(this.accountType == "institution") {
          this.accountBoolean = true;
        } else if(this.accountType == "user") {
          this.accountBoolean = false;
        }
    this.type = "item";
    this.isFilterAll = true;
  }

  ngOnInit() {
    this.initialiseFilter();
  }
  
  ionViewDidEnter() {
    this.initialiseFilter();
    this.viewEntered = true;
  }
  
  initialiseFilter() {
    console.log(this.isFilterAll);
    if(this.isFilterAll == true) {
      this.initialiseAll();
      this.initialisePaid();
    } else {
      this.initialiseActiveOnly();
      this.initialiseActivePaid();
    }
  }

  initialiseData() {
    this.manpowerResourceList = this.manpowerResource;
    this.knowledgeResourceList = this.knowledgeResource;
    this.itemResourceList = this.itemResource;
    this.venueResourceList = this.venueResource;
    this.paidResourceList = this.paidResource;
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

  initialiseActivePaid() {
    this.initialisePaid();
    if(this.paidResourceList.length > 0) {
    for (var j = 0; j < this.paidResourceList.length; j++) {
      if(this.paidResourceList[j].status == "inactive") {
        this.paidResourceList.splice(j, 1);
      }
    }
  }
  }

  initialisePaid() {
    this.paidService.getAllMyPaidResources().subscribe((res) => {
      this.paidResource = res.data.paidresource;
      this.paidResourceList = this.paidResource;
      if(this.paidResource.length > 0) {
        this.noPaidResourceBoolean = false;
        for(var i = 0; i < this.paidResource.length; i++) {
          if(this.paidResource[i].imgPath.length > 0) {
            for (var j = 0; j < this.paidResource[i].imgPath.length; j++) {
              this.paidResource[i].imgPath[j] = this.sessionService.getRscPath() + this.paidResource[i].imgPath[j] + '?random+=' + Math.random(); 
              console.log(1);
            }
            this.noPaidResourcePicBoolean = false;
          } else {
            this.noPaidResourcePicBoolean = true;
          }
          // this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
        }
      } else {
          this.noPaidResourceBoolean = true;
      }
      this.paidResourceList = this.paidResource.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
    }
    ),
    err => {
      console.log('********** Paid Resource.ts: ', err.error.msg);
    };

  }

  initialiseAll() {
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
          this.knowledgeResourceList = this.knowledgeResource.sort(function (a, b) {
            return a.updatedAt.localeCompare(b.updatedAt);
          }).reverse();
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
            if(this.itemResource[i].imgPath.length > 0) {
              for (var j = 0; j < this.itemResource[i].imgPath.length; j++) {
                this.itemResource[i].imgPath[j] = this.sessionService.getRscPath() + this.itemResource[i].imgPath[j] + '?random+=' + Math.random(); 
                console.log(1);
              }
              this.noItemPicBoolean = false;
            } else {
              this.noItemPicBoolean = true;
            }
            // this.itemResource[i].imgPath = this.sessionService.getRscPath() + this.itemResource[i].imgPath  +'?random+=' + Math.random();
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
        this.venueResourceList = this.venueResource.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }),
      
      err => {
        console.log('********** Venue Resource (institution).ts: ', err.error.msg);
      };

  } else if(this.accountBoolean == false) {
        this.resourceService.getUserPrivateKnowledgeResource().subscribe((res) => {
        this.knowledgeResource = res.data.knowledges;
        console.log(this.knowledgeResource);
        this.knowledgeResourceList = this.knowledgeResource;
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
          if(this.itemResource[i].imgPath.length > 0) {
            for (var j = 0; j < this.itemResource[i].imgPath.length; j++) {
              this.itemResource[i].imgPath[j] = this.sessionService.getRscPath() + this.itemResource[i].imgPath[j] + '?random+=' + Math.random(); 
              console.log(1);
            }
            this.noItemPicBoolean = false;
          } else {
            this.noItemPicBoolean = true;
          }
        }
        console.log(this.noItemPicBoolean);
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
        console.log(this.venueResource);
      if(this.venueResource.length > 0) {
        this.noVenueResourceBoolean = false;
        for(var i = 0; i < this.venueResource.length; i++) {
          if(this.venueResource[i].imgPath.length > 0) {
            for (var j = 0; j < this.venueResource[i].imgPath.length; j++) {
              this.venueResource[i].imgPath[j] = this.sessionService.getRscPath() + this.venueResource[i].imgPath[j] + '?random+=' + Math.random(); 
              console.log(1);
            }
            this.noVenuePicBoolean = false;
          } else {
            this.noVenuePicBoolean = true;
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
        this.manpowerImgPath = this.sessionService.getRscPath() + this.user.data.user.ionicImg  +'?random+=' + Math.random();
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

  initialiseActiveOnly() {
    console.log("I am at active only");
    if(this.accountBoolean == true)
    {
      this.resourceService.getInstitutionKnowledgeResource(this.user.data.user.id).subscribe((res) => {
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

      this.resourceService.getInstitutionItemResource(this.user.data.user.id).subscribe((res) => {
        this.itemResource = res.data.items;
        if(this.itemResource.length > 0) {
          this.noItemResourceBoolean = false;
          for(var i = 0; i < this.itemResource.length; i++) {
            if(this.itemResource[i].imgPath.length > 0) {
              for (var j = 0; j < this.itemResource[i].imgPath.length; j++) {
                this.itemResource[i].imgPath[j] = this.sessionService.getRscPath() + this.itemResource[i].imgPath[j] + '?random+=' + Math.random(); 
                console.log(1);
              }
              this.noItemPicBoolean = false;
            } else {
              this.noItemPicBoolean = true;
            }
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

      this.resourceService.getInstitutionVenueResource(this.user.data.user.id).subscribe((res) => {
        this.venueResource = res.data.venues
        this.venueResourceList = this.venueResource;
        if(this.venueResource.length > 0) {
          this.noVenueResourceBoolean = false;
          for(var i = 0; i < this.venueResource.length; i++) {
            if(this.venueResource[i].imgPath.length > 0) {
              for (var j = 0; j < this.venueResource[i].imgPath.length; j++) {
                this.venueResource[i].imgPath[j] = this.sessionService.getRscPath() + this.venueResource[i].imgPath[j] + '?random+=' + Math.random(); 
                console.log(1);
              }
              this.noVenuePicBoolean = false;
            } else {
              this.noVenuePicBoolean = true;
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
        this.resourceService.getUserKnowledgeResource(this.user.data.user.id).subscribe((res) => {
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

      this.resourceService.getUserItemResource(this.user.data.user.id).subscribe((res) => {
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
      this.venueResourceList = this.venueResource.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
      }),
      err => {
        console.log('********** Venue Resource (user).ts: ', err.error.msg);
      };

      this.resourceService.getUserManpowerResource(this.user.data.user.id).subscribe((res) => {
      this.manpowerResource = res.data.manpowers;
      if(this.manpowerResource.length > 0) {
        this.noManpowerResourceBoolean = false;
        for(var i = 0; i < this.manpowerResource.length; i++) {
          this.manpowerResource[i].imgPath = this.sessionService.getRscPath() + this.manpowerResource[i].imgPath  +'?random+=' + Math.random();
        }
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

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
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

    this.paidResourceList = this.paidResourceList.filter( paidRes => {
      if (paidRes.title && searchTerm) {
        return (paidRes.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  viewResource(resource) {
    this.router.navigateByUrl("/view-resource/" + this.type + "/" + resource.id);
  }

  viewPaidResource(resource) {
    this.router.navigateByUrl("/view-paid-resource-details/" + this.type + "/" + resource.id);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
