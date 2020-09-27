import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { isRegExp } from 'util';
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.page.html',
  styleUrls: ['./view-project.page.scss'],
})
export class ViewProjectPage implements OnInit {
  id: any;
  
  projectToView: any;
  currentUser: any;
  founderBoolean: boolean;
  adminBoolean: boolean;
  userBoolean: boolean;
  image: string;
  page: any;

  title: any;
  admins: any;
  contributors: any;
  resourceNeeds: any[];
  country: any;
  host: any;
  status: any;
  desc: any;
  SDGs: any[];
  kpis: any[];
  resultSuccess: boolean;
  error: boolean;
  errorMessage: any;
  completedBoolean: boolean;
  contributions: any;
  viewId: any;
  
  

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private alertController: AlertController, private router: Router, private sessionService: SessionService, private tokenStorage: TokenStorageService, private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initialise();
    this.tokenStorage.setProjectId(this.id);
    if(this.tokenStorage.getViewId() != undefined) {
      this.viewId = this.tokenStorage.getViewId().id;
    }
    
    this.page = "feed";

    /*this.contributions = [
      {
        "projectId": "5f6b11ada7e36f1445610166",
        "needId": "5f6b1538a054134644039654",
        "requestId": "5f6c6b3d0db3cd871b3e2b44",
        "requestType": "project",
        "resType": "manpower",
        "rating": 0,
        "contributor": "5f63fa7876e51a95bde86666",
        "contributorType": "institution",
        "needTitle": "50 Coats for dogs",
        "resourceTitle": "Software Engineer",
        "resourceId": "5f6c6c2c0be9cf4628b40b5e",
        "desc": "Backend Software Engineer (Part-Time)",
        "contributorUsername": "wtoilet"
      }
    ]*/
  }

  ionViewDidEnter() {
    if(this.tokenStorage.getViewId() != undefined) {
      this.viewId = this.tokenStorage.getViewId().id;
    }
    this.initialise();
  }

  initialise() {
    this.currentUser = this.tokenStorage.getUser();
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectService.viewProject(this.id).subscribe(res => {
      this.projectToView = res.data.targetProject;
      if(this.currentUser.data.user.id == this.projectToView.host) {
        this.founderBoolean = true;
      } else if(this.projectToView.admins.includes(this.currentUser.data.user.id)) {
        console.log("changed");
        this.adminBoolean = true;
      } else {
        this.userBoolean = true;
      }
      this.image = this.sessionService.getRscPath() + this.projectToView.imgPath +'?random+=' + Math.random();
      this.title = this.projectToView.title;
      this.desc = this.projectToView.desc;
      this.contributors = this.projectToView.contributors;
      this.country = this.projectToView.country;
      this.host = this.projectToView.host;
      this.status = this.projectToView.status;
      this.SDGs = this.projectToView.SDGs;
  },
  err => {
    console.log('********** View Projects.ts: ', err.error.msg);
  });
  this.projectService.getKpi(this.id).subscribe((res)=>{
      this.kpis = res.data.kpis;
  },
  err=> {
    console.log('******* KPI retrieval error: ', err.error.msg);
  })
  this.projectService.getResourceNeeds(this.id).subscribe((res)=>{
    this.resourceNeeds = res.data.resourceneeds;
},
err=> {
  console.log('******* KPI retrieval error: ', err.error.msg);
})
  this.projectService.getAdmins(this.id).subscribe((res)=>{
    this.admins = res.data.admins;
    console.log(this.admins);
    if(this.admins != undefined) {
      for(var i =0; i < this.admins.length; i++) {
          this.admins[i].ionicImg = this.sessionService.getRscPath() + this.admins[i].ionicImg +'?random+=' + Math.random();
      }
    }
    
},
err=> {
  console.log('******* KPI retrieval error: ', err.error.msg);
})
console.log(this.id);

this.projectService.getResourceContributions(this.id).subscribe((res)=>{
    this.contributions = res.data.contributions;
    console.log(this.contributions);
},
(err) => {
  console.log('******* Contributions retrieval error: ', err.error.msg);
})

if(this.status == "completed") {
  this.completedBoolean = true;
} else {
  this.completedBoolean = false;
}

console.log(this.completedBoolean);
  }

  update(event) {
    this.router.navigate(["/update-project/" + this.id]);
  }

  view(event) {
    this.router.navigate(["/view-admins/" + this.id])
  }

  upload(event) {
    this.router.navigate(["/upload-projectPic/" + this.id]);
  }

  manageKpi(ev) {
    this.router.navigate(["/kpi-management/" + this.id]);
  }

  manageNeeds(ev) {
    this.router.navigate(["/resource-needs-management/" + this.id]);
  }

  viewProfile(ev, c) {
    this.router.navigate(['/view-others-profile/' + c.contributorUsername + "/" + c.contributorType ])
  }

  viewAdminProfile(ev, a) {
    if(a.id == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      this.router.navigate(['/view-others-profile/' + a.username + "/user" ])
    }
    
  }

  back() {
    if(this.currentUser.data.user.id != this.tokenStorage.getViewId() && this.tokenStorage.getViewId() != undefined) {
      this.router.navigate(["/my-projects/" + this.tokenStorage.getViewId().id]);
    } else if(this.currentUser.data.user.id == this.tokenStorage.getViewId()) {
      this.router.navigate(["/my-projects/" + this.currentUser.data.user.id]);
    } else if(this.tokenStorage.getViewId() == undefined) {
      this.router.navigate(["/my-projects/" + this.currentUser.data.user.id]);
    }
  }

  async delete(event)
	{
		const alert = await this.alertController.create({
			header: 'Confirm Delete Project',
			message: 'Confirm delete Project?',
			buttons: [
			{
			  text: 'Cancel',
			  role: 'cancel',
			  cssClass: 'secondary',
			  handler: (blah) => {
				
			  }
			}, {
			  text: 'Okay',
			  handler: () => {
				this.projectService.deleteProject(this.id).subscribe(
					response => {
            this.resultSuccess = true;
            this.successToast();
            this.back();
					},
					error => {
            this.failureToast(error);
						this.error = true;
						this.errorMessage = error;
					}
				);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async complete(event, project)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to mark this project as complete',
			message: 'Confirm completion of project?',
			buttons: [
			{
			  text: 'Cancel',
			  role: 'cancel',
			  cssClass: 'secondary',
			  handler: (blah) => {
				
			  }
			}, {
			  text: 'Okay',
			  handler: () => {
				this.projectService.completeProject(this.id).subscribe(
					response => {
            this.resultSuccess = true;
            this.completeSuccessToast();
            this.router.navigate(["/my-projects/" + this.currentUser.data.user.id]);
					},
					error => {
            this.failureToast(error);
						this.error = true;
						this.errorMessage = error;
					}
				);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async completeSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Congratulations on the completion of your project!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }


  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Deletion successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Deletion Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

}
