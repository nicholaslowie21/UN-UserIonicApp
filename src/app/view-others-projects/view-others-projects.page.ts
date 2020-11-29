import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { InstitutionService } from '../services/institution.service';
import { ProjectService } from '../services/project.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-others-projects',
  templateUrl: './view-others-projects.page.html',
  styleUrls: ['./view-others-projects.page.scss'],
})
export class ViewOthersProjectsPage implements OnInit {
  user: any;
  accountType: any;
  accountBoolean: boolean;
  id: string;
  name: any;
  currProjects: any;
  pastProjects: any;
  pastContributions: any;
  noPastContributionBoolean: boolean;
  noPastProjectBoolean: boolean;
  noCurrProjectBoolean: boolean;
  currentProjectsList: any;
  pastProjectsList: any;
  pastContributionsList: any[];
  type: string;
  role: string;
  avgRating: any;

  constructor(private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute,	private tokenStorage : TokenStorageService, private institutionService: InstitutionService, private userService: UserService, private sessionService: SessionService, private alertController: AlertController, private projectService: ProjectService, private toastCtrl: ToastController) {
    this.user = this.tokenStorage.getUser();
    console.log(this.user);
    this.type = "currProj";
    this.role = "admin";
    if(this.tokenStorage.getViewId() != this.user.data.user.id && this.tokenStorage.getViewId()!= undefined ){
        this.accountType = this.tokenStorage.getViewId().accountType;
    } else if(this.id == this.user.id){
      console.log("elsenran");
      this.accountType = this.tokenStorage.getAccountType();
    
    }
    console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else if(this.accountType == "user") {
      this.accountBoolean = false;
    }
    console.log(this.accountBoolean);
  }

ngOnInit() {
this.id = this.activatedRoute.snapshot.paramMap.get('Id');
this.initialise();
this.initializeCurr();
this.initializePast();
}

ionViewDidEnter() {
this.initialise();
this.initializeCurr();
this.initializePast();
}

initialise() {
this.id = this.activatedRoute.snapshot.paramMap.get('Id');
if(this.accountBoolean == true)
{   
    console.log("here");
    this.institutionService.viewInstitutionById(this.id).subscribe((res) => {
      this.name = res.data.targetInstitution.name;
    },
    (err) => {
      console.log("*******************Retrieve User error(My-projects)" + err.error.msg);
    })
    this.institutionService.getCurrentProjects(this.id).subscribe((res) => {
        this.currProjects = res.data.currProjects;
        this.initializeCurr();
        if(this.currProjects.length > 0) {
          this.noCurrProjectBoolean = false;
          for(var i = 0; i < this.currProjects.length; i++) {
            this.currProjects[i].imgPath = this.sessionService.getRscPath() + this.currProjects[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
          console.log("else ran");
            this.noCurrProjectBoolean = true;
        }
        
    }
    ),
    err => {
      console.log('********** Current-projects(institution).ts: ', err.error.msg);
    };

    this.institutionService.getPastProjects(this.id).subscribe((res) => {
      const pastProj = res.data.pastProjects
      this.pastProjects = [];
      
      if(pastProj.length > 0) {
        for(var i = 0; i < pastProj.length; i++) {
          if(this.checkRole(pastProj[i]) != 'Contributor') {
            pastProj[i].imgPath = this.sessionService.getRscPath() + pastProj[i].imgPath  +'?random+=' + Math.random();
            this.pastProjects.push(pastProj[i])
            this.noPastProjectBoolean = false;
          }
        }
        
      } else {
          this.noPastProjectBoolean = true;
      }
      if(this.noPastProjectBoolean == false) {
        this.initializePast();
        this.pastProjectsList = this.pastProjects.sort(function (a, b) {
          return a.updatedAt.localeCompare(b.updatedAt);
        }).reverse();
      }

  }),
    err => {
      console.log('********** Past-projects(institution).ts: ', err.error.msg);
    };
    this.projectService.getContributionByUser(this.id, "institution").subscribe((res) => {
      this.pastContributions = res.data.contributions
      this.avgRating = res.data.avgRating;
      this.pastContributionsList = this.pastContributions;
      if(this.pastContributions.length > 0) {
        this.noPastContributionBoolean = false;
        for(var i = 0; i < this.pastProjects.length; i++) {
          this.pastContributions[i].ionicImgPath = this.sessionService.getRscPath() + this.pastContributions[i].ionicImgPath  +'?random+=' + Math.random();
        }

        this.pastContributionsList = this.pastContributions.sort(function (a, b) {
              return a.updatedAt.localeCompare(b.updatedAt);
            }).reverse();
      } else {
          this.noPastContributionBoolean = true;
      }
    })

} else if(this.accountBoolean == false) {
      this.userService.viewUserById(this.id).subscribe((res) => {
            this.name = res.data.targetUser.name;
      }, (err) => {
        console.log("*******************Retrieve User error(My-projects)" + err.error.msg);
      })
      this.userService.getCurrentProjects(this.id).subscribe((res) => {
      this.currProjects = res.data.currProjects
      this.initializeCurr();
      if(this.currProjects.length > 0) {
        this.noCurrProjectBoolean = false;
        for(var i = 0; i < this.currProjects.length; i++) {
          this.currProjects[i].imgPath = this.sessionService.getRscPath() + this.currProjects[i].imgPath  +'?random+=' + Math.random();
        }
      } else {
          this.noCurrProjectBoolean = true;
      }
}),
  err => {
    console.log('********** Current-projects(user).ts: ', err.error.msg);
  };
  this.userService.getPastProjects(this.id).subscribe((res) => {
    const pastProj = res.data.pastProjects
    this.pastProjects = [];
    
    if(pastProj.length > 0) {
      for(var i = 0; i < pastProj.length; i++) {
        if(this.checkRole(pastProj[i]) != 'Contributor') {
          pastProj[i].imgPath = this.sessionService.getRscPath() + pastProj[i].imgPath  +'?random+=' + Math.random();
          this.pastProjects.push(pastProj[i])
          this.noPastProjectBoolean = false;
        }
      }
      
    } else {
        this.noPastProjectBoolean = true;
    }
    if(this.noPastProjectBoolean == false) {
      this.initializePast();
      this.pastProjectsList = this.pastProjects.sort(function (a, b) {
        return a.updatedAt.localeCompare(b.updatedAt);
      }).reverse();
    }
  }),
  err => {
    console.log('********** Past-projects(user).ts: ', err.error.msg);
  };

  this.projectService.getContributionByUser(this.id, "user").subscribe((res) => {
    this.pastContributions = res.data.contributions
    this.avgRating = res.data.avgRating;
    this.pastContributionsList = this.pastContributions;
    if(this.pastContributions.length > 0) {
      this.noPastContributionBoolean = false;
      for(var i = 0; i < this.pastProjects.length; i++) {
        this.pastContributions[i].ionicImgPath = this.sessionService.getRscPath() + this.pastContributions[i].ionicImgPath  +'?random+=' + Math.random();
      }

      this.pastContributionsList = this.pastContributions.sort(function (a, b) {
            return a.updatedAt.localeCompare(b.updatedAt);
          }).reverse();
    } else {
        this.noPastContributionBoolean = true;
    }
    console.log(this.avgRating);
    console.log(this.pastContributions);
    console.log(this.pastContributionsList);
  })
}
}



view(event, project) {
this.router.navigate(["/view-project/" + project])
}

back() {
if(this.user.data.user.id != this.tokenStorage.getViewId() && this.tokenStorage.getViewId() != undefined) {
  this.router.navigate(['/view-others-profile/' + this.tokenStorage.getViewId().username + "/" + this.tokenStorage.getViewId().accountType]);
} else if(this.user.data.user.id == this.tokenStorage.getViewId()) {
  this.router.navigateByUrl("/tabs/profile");
} else if(this.tokenStorage.getViewId() == undefined) {
  this.router.navigateByUrl("/tabs/profile");
}
}

initializeCurr() {
  this.currentProjectsList = this.currProjects;
}
initializePast() {
 this.pastProjectsList = this.pastProjects;
 this.pastContributionsList = this.pastContributions;
}

async filterCurrList(evt) {
 this.initializeCurr();
 const searchTerm = evt.srcElement.value;

 if (!searchTerm) {
   return;
 }

 this.currentProjectsList = this.currentProjectsList.filter(currentProject => {
   if (currentProject.title && searchTerm) {
     return (currentProject.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
   }
 });
}

async filterPastList(evt) {
 this.initializePast();
 const searchTerm = evt.srcElement.value;

 if (!searchTerm) {
   return;
 }

 if(this.role == 'admin') {
  this.pastProjectsList = this.pastProjectsList.filter(pastProject => {
    if (pastProject.title && searchTerm) {
      return (pastProject.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }
  });
} else {
  this.pastContributionsList = this.pastContributionsList.filter(pastContribution => {
    if (pastContribution.title && searchTerm) {
      return (pastContribution.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }
  });
}
}

segmentChanged(ev: any) {
  console.log('Segment changed', ev);
}

checkRole(project): string {
  if(project.host == this.id) {
    return 'Founder';
  }
  for(var i=0; i<project.admins.length; i++) {
    if(project.admins[i] == this.id) {
      return 'Admin';
    }
  }
  return 'Contributor';
}


}
