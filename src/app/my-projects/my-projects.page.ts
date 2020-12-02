import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { InstitutionService } from '../services/institution.service';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.page.html',
  styleUrls: ['./my-projects.page.scss'],
})
export class MyProjectsPage implements OnInit {
  currProjects : any[];
  pastProjects : any[];
  pastContributions: any[];
  accountBoolean: boolean;
  accountType: any;
  user: any;
  avgRating: any;

  noCurrProjectBoolean: boolean;
  noPastProjectBoolean: boolean;
  noPastContributionBoolean: boolean;
  code: any;
  resultSuccess: boolean;
  error: boolean;
  errorMessage: any;
  id: string;
  name: any;
  currProjectsInitial: any[];
  searchCurrentProjectString = '';
  currentProjectsList: any[];
  pastProjectsList: any[];
  pastContributionsList: any[];
  type: string;
  role: string;

  constructor(private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute,	private tokenStorage : TokenStorageService, private institutionService: InstitutionService, private userService: UserService, private sessionService: SessionService, private alertController: AlertController, private projectService: ProjectService, private toastCtrl: ToastController) {
        /*this.accountType = this.tokenStorage.getAccountType();
        this.user = this.tokenStorage.getUser();
      console.log(this.accountType);
        if(this.accountType == "institution") {
          this.accountBoolean = true;
        } else if(this.accountType == "user") {
          this.accountBoolean = false;
        }*/
        this.type = "currProj";
        this.role = "admin"; //for ion segment for past involvements
        this.user = this.tokenStorage.getUser();
        this.accountType = this.tokenStorage.getAccountType();
        
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
    // Dummy data to be replaced with actual data when the proj endpoints are created. Some attributes not in the dummy data, and some (eg role) are created here.
    /*this.currProjects = [
      {"id": "1", "title": "Project One", "desc": "This is a special project", "SDG": [1, 3], "status": "ongoing", "role": "Contributor"},
      {"id": "2", "title": "Project Two", "desc": "We are trying to solve problems", "SDG": [2, 6], "status": "ongoing", "role": "Admin"},
      {"id": "6", "title": "Project Six", "desc": "This SDG is especially important", "SDG": [7], "status": "ongoing", "role": "Contributor"},
    ];

    this.pastProjects = [
      {"id": "3", "title": "Project Three", "desc": "This SDG is especially important", "SDG": [1, 5], "status": "completed", "role": "Contributor"},
      {"id": "4", "title": "Project Four", "desc": "This is a special project", "SDG": [4], "status": "completed", "role": "Contributor"},
      {"id": "5", "title": "Project Five", "desc": "We are trying to solve problems", "SDG": [10], "status": "completed", "role": "Admin"}
    ];*/
  }

  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.initialise();
    this.initializeCurr();
    this.initializePast();
  }

  initialise() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    if(this.accountBoolean == true)
    {   
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

              this.currentProjectsList = this.currProjects.sort(function (a, b) {
                return a.updatedAt.localeCompare(b.updatedAt);
              }).reverse();
            } else {
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
              this.pastContributions[i].projectImg = this.sessionService.getRscPath() + this.pastContributions[i].projectImg  +'?random+=' + Math.random();
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

                this.currentProjectsList = this.currProjects.sort(function (a, b) {
                  return a.updatedAt.localeCompare(b.updatedAt);
                }).reverse();
              } else {
                  this.noCurrProjectBoolean = true;
              }
    }),
      err => {
        console.log('********** Current-projects(user).ts: ', err.error.msg);
      };
      console.log("retrieved projects")
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
          console.log(this.pastProjects);
          
        } else {
            this.noPastProjectBoolean = true;
        }
        if(this.noPastProjectBoolean == false) {
          this.initializePast();
          this.pastProjectsList = this.pastProjects.sort(function (a, b) {
            return a.updatedAt.localeCompare(b.updatedAt);
          }).reverse();
        }
        console.log(this.pastProjects);
        console.log(this.pastProjectsList);
      }),
      err => {
        console.log('********** Past-projects(user).ts: ', err.error.msg);
      };

      this.projectService.getContributionByUser(this.user.data.user.id, "user").subscribe((res) => {
        console.log("I am at proj service endpt call" + res);
        this.pastContributions = res.data.contributions
        this.avgRating = res.data.avgRating;
        this.pastContributionsList = this.pastContributions;
        
        if(this.pastContributions.length > 0) {
          this.noPastContributionBoolean = false;
          for(var i = 0; i < this.pastContributions.length; i++) {
            this.pastContributions[i].projectImg = this.sessionService.getRscPath() + this.pastContributions[i].projectImg  +'?random+=' + Math.random();
          }
          console.log(this.pastContributionsList);
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

  viewContributedProject(event, project) {
    this.router.navigate(["/view-project/" + project.projectId])
  }

  viewProject(event, project) {
    this.router.navigate(["/view-project/" + project.id])
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

 backNav() {
   this.navCtrl.pop();
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

formatDate(date): any {
  let formattedDate = new Date(date).toUTCString();
  return formattedDate.substring(5, formattedDate.length-13);
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
