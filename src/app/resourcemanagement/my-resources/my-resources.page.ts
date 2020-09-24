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
  accountBoolean: boolean;
  noKnowledgeResourceBoolean: boolean;
  noItemResourceBoolean: boolean;
  noVenueResourceBoolean: boolean;
  noManpowerResourceBoolean: boolean;

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
   }

  ngOnInit() {
    if(this.accountBoolean == true)
    {
        this.resourceService.getInstitutionKnowledgeResource(this.user.data.user.id).subscribe((res) => {
          this.knowledgeResource = res.data.knowledges;
          if(this.knowledgeResource.length > 0) {
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
          if(this.itemResource.length > 0) {
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
          if(this.venueResource.length > 0) {
            for(var i = 0; i < this.venueResource.length; i++) {
              this.venueResource[i].imgPath = this.sessionService.getRscPath() + this.venueResource[i].imgPath  +'?random+=' + Math.random();
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
          if(this.knowledgeResource.length > 0) {
            for(var i = 0; i < this.knowledgeResource.length; i++) {
              this.knowledgeResource[i].imgPath = this.sessionService.getRscPath() + this.knowledgeResource[i].imgPath  +'?random+=' + Math.random();
            } 
          } else {
              this.noKnowledgeResourceBoolean = true;
          }
        }),
        err => {
          console.log('********** Knowledge Resource (user).ts: ', err.error.msg);
        }

        this.resourceService.getUserItemResource(this.user.data.user.id).subscribe((res) => {
        this.itemResource = res.data.items;
        if(this.itemResource.length > 0) {
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
        if(this.venueResource.length > 0) {
          for(var i = 0; i < this.venueResource.length; i++) {
            this.venueResource[i].imgPath = this.sessionService.getRscPath() + this.venueResource[i].imgPath  +'?random+=' + Math.random();
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
        if(this.manpowerResource.length > 0) {
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

    /*this.manpowerResource = [{"title": "Software Engineer", "desc": "I can code through the night, just sponsor me Redbull", "status": "active", "region": "Singapore"}];
    this.knowledgeResource = [{"title": "How to code with stamina", "desc": "Have a Redbull at hand and Google and you're off"}];
    this.itemResource = [
      {"title": "Tables", "desc": "I have 10 tables as I clicked an extra 0 when I was ordering online. Up for grabs!", "status": "active", "region": "Singapore"},
      {"title": "Chairs", "desc": "I have 10 chairs as I clicked an extra 0 when I was ordering online. Up for grabs!", "status": "inactive", "region": "Singapore"},
    ];
    this.venueResource = [
      {"title": "Auditorium", "desc": "Can seat up to 100 pax", "address": "NUS Create Way #01-119", "status": "active", "region": "Singapore"},
      {"title": "Stairway to Fitness", "desc": "Open to people hosting Vertical Marathons!", "address":"Stairway Lane Singapore 133022", "status": "inactive", "region": "Singapore"}
    ];
    this.type = 'manpower';*/
  }

  viewResource(resource) {
    // this.tokenStorage.saveCurrResource(resource);
    // this.tokenStorage.saveCurrResourceType(this.type);
    this.router.navigateByUrl("/view-resource/" + this.type + "/" + resource.id);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
