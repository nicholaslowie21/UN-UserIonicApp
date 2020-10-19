import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstitutionService } from '../services/institution.service';
import { MarketplaceService } from '../services/marketplace.service';
import { ProjectService } from '../services/project.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-marketplace-projects',
  templateUrl: './view-marketplace-projects.page.html',
  styleUrls: ['./view-marketplace-projects.page.scss'],
})
export class ViewMarketplaceProjectsPage implements OnInit {
  projectsList: any;
  projectsViewList: any[];
  accountType: any;
  accountBoolean: boolean;
  currentUser: any;
  filterList: any;
  sdgsList: any[];
  sdgs: any[];
  data: { filterSDGs: any; };
  sdgFilterBoolean: boolean;

  constructor(private router: Router, 
              private marketplaceService: MarketplaceService, 
              private sessionService: SessionService, 
              private tokenStorage: TokenStorageService,
              private institutionService:InstitutionService,
              private userService: UserService,
              private projectService: ProjectService) {
    this.accountType = this.tokenStorage.getAccountType();
    this.currentUser = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
    this.initializeProjs();
   }

  ngOnInit() {
    this.sdgsList = [{"id":1},{"id":2}, {"id":3},
    {"id":4}, {"id":5},{"id":6},
    {"id":7}, {"id":8},{"id":9},
    {"id":10}, {"id":11}, {"id":12},
    {"id":13}, {"id":14}, {"id":15},
    {"id":16},{"id":17}]
    this.initialise();
    this.initializeProjs();
  }

  ionViewDidEnter() {
    this.initializeProjs();
  }

  filterSDGS(sdgs) {
    this.sdgFilterBoolean = true;
    this.data = {
      "filterSDGs": sdgs
    }
    this.marketplaceService.getFilteredOngoingProjects(this.data).subscribe((res) => {
      this.filterList = res.data.projects;
    }, (err) => {
      console.log("****************View Marketplace Projects(filterSDGs).page.ts error: " + err.error.msg);
    })
  }

  initialise() {
    this.marketplaceService.getOngoingProjects().subscribe((res) => {
      this.projectsList = res.data.projects;
      if(this.projectsList != undefined) {
        for(var i = 0; i < this.projectsList.length; i ++) {
          this.projectsList[i].imgPath = this.sessionService.getRscPath() + this.projectsList[i].imgPath +'?random+=' + Math.random();
          this.projectsList[i].ownerImg = this.sessionService.getRscPath() + this.projectsList[i].ownerImg + '?random+=' + Math.random();
          var hostType = this.projectsList[i].hostType;
          console.log(hostType);
          var x = this.projectsList[i];

        }

        /*for(var i = 0; i < this.projectsList.length; i ++) {
          this.projectService.getResourceNeeds(this.projectsList.id).subscribe((res) => {
            this.resourceNeed
          })
        }*/
      }
    }, (err) => {
        console.log("****************View Marketplace Projects.page.ts error: " + err.error.msg);
    })
  }

  viewFounderProfile(ev, h) {
    var username = "";
    if(h.id == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      
      if(h.hostType == "institution") {
          this.institutionService.viewInstitutionById(h.host).subscribe((res) => {
            username = res.data.targetInstitution.username
            this.router.navigate(['/view-others-profile/' + username + "/" + h.hostType ])
          }, (err) => {
            console.log("View Founder Profile error: " + err.error.msg);
          })
      } else if(h.hostType == "user") {
        this.userService.viewUserById(h.host).subscribe((res) => {
          username = res.data.targetUser.username
          this.router.navigate(['/view-others-profile/' + username + "/" + h.hostType ])
        }, (err) => {
          console.log("View Founder Profile error: " + err.error.msg);
        })
      }
      
    }
  }

  viewProject(ev, p) {
    this.router.navigate(['/view-market-project-details/' + p.id]);
  }

  reset() {
    this.sdgs = null;
    this.initializeProjs();
  }

  initializeProjs() {
    this.filterList = this.projectsList;
  }
  
   async filterProjectsList(evt) {
    if(this.sdgFilterBoolean != true) {
      this.initializeProjs();
      this.reset();
    }
    this.sdgFilterBoolean = false;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.filterList = this.filterList.filter(project => {
      if (project.title && searchTerm) {
        return (project.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (project.ownerName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) 
        || (project.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  
  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

}
