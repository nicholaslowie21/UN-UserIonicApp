import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RequestVerificationPage } from '../accountmanagement/request-verification/request-verification.page';
import { ProjrequestModalPage } from '../projrequest-modal/projrequest-modal.page';
import { ProjectService } from '../services/project.service';
import { ResourceService } from '../services/resource.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-create-project-request',
  templateUrl: './create-project-request.page.html',
  styleUrls: ['./create-project-request.page.scss'],
})
export class CreateProjectRequestPage implements OnInit {
  user: any;
  type: string;
  accountType: any;
  id: any;
  accountBoolean: boolean;
  manpowerResourceList: any;
  manpowerResource: any;
  knowledgeResourceList: any;
  knowledgeResource: any;
  itemResourceList: any;
  itemResource: any;
  venueResourceList: any;
  venueResource: any;
  
  noKnowledgeResourceBoolean: boolean;
  noItemResourceBoolean: boolean;
  noVenueResourceBoolean: boolean;
  noManpowerResourceBoolean: boolean;
  manpowerImgPath: string;
  isFilterAll: boolean;
  needId: string;
  modal: HTMLIonModalElement;
  needType: string;

  constructor(private router: Router, private modalController: ModalController, private activatedRoute: ActivatedRoute, private sessionService: SessionService, private tokenStorage: TokenStorageService, private resourceService: ResourceService) { }

  ngOnInit() {
    this.needId = this.activatedRoute.snapshot.paramMap.get('Id');
    this.needType = this.activatedRoute.snapshot.paramMap.get('type');
    this.type = this.needType;
    this.accountType = this.tokenStorage.getAccountType();
    this.user = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
  }

  ionViewDidEnter() {
    this.initialiseFilter();
  }
  
  initialiseFilter() {
      this.initialiseActiveOnly();
  }

  initialiseData() {
    this.manpowerResourceList = this.manpowerResource;
    this.knowledgeResourceList = this.knowledgeResource;
    this.itemResourceList = this.itemResource;
    this.venueResourceList = this.venueResource;
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
          this.manpowerImgPath = this.sessionService.getRscPath() + this.user.data.user.ionicImg  +'?random+=' + Math.random();
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
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async contribute(resource, type) {
    console.log(this.needId);
    this.modal = await this.modalController.create({
      component: ProjrequestModalPage,
      componentProps: {"resource": resource, "resType": type, "needId": this.needId}
    });
    return await this.modal.present();
  }

  viewResource(resource) {
    this.router.navigateByUrl("/view-resource/" + this.type + "/" + resource.id);
  }

}
