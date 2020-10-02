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
  noPastProjectBoolean: boolean;
  noCurrProjectBoolean: boolean;

  constructor(private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute,	private tokenStorage : TokenStorageService, private institutionService: InstitutionService, private userService: UserService, private sessionService: SessionService, private alertController: AlertController, private projectService: ProjectService, private toastCtrl: ToastController) {
    this.user = this.tokenStorage.getUser();
    console.log(this.user);
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
}

ionViewDidEnter() {
this.initialise();
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
    this.pastProjects = res.data.pastProjects
    console.log(this.pastProjects.length);
    if(this.pastProjects.length > 0) {
      this.noPastProjectBoolean = false;
      for(var i = 0; i < this.pastProjects.length; i++) {
        this.pastProjects[i].imgPath = this.sessionService.getRscPath() + this.pastProjects[i].imgPath  +'?random+=' + Math.random();
      }
    } else {
        this.noPastProjectBoolean = true;
    }

  }),
    err => {
      console.log('********** Past-projects(institution).ts: ', err.error.msg);
    };

} else if(this.accountBoolean == false) {
      this.userService.viewUserById(this.id).subscribe((res) => {
            this.name = res.data.targetUser.name;
      }, (err) => {
        console.log("*******************Retrieve User error(My-projects)" + err.error.msg);
      })
      this.userService.getCurrentProjects(this.id).subscribe((res) => {
      this.currProjects = res.data.currProjects

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
        this.pastProjects = res.data.pastProjects

        if(this.pastProjects.length > 0) {
          this.noPastProjectBoolean = false;
          for(var i = 0; i < this.pastProjects.length; i++) {
            this.pastProjects[i].imgPath = this.sessionService.getRscPath() + this.pastProjects[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
            this.noPastProjectBoolean = true;
        }
  }),
  err => {
    console.log('********** Past-projects(user).ts: ', err.error.msg);
  };
}
}



view(event, project) {
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



}
