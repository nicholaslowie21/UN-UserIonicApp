import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { CreateMoneyRequestPage } from '../funding/create-money-request/create-money-request.page';
import { InstitutionService } from '../services/institution.service';
import { ProjectService } from '../services/project.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-market-project-details',
  templateUrl: './view-market-project-details.page.html',
  styleUrls: ['./view-market-project-details.page.scss'],
})
export class ViewMarketProjectDetailsPage implements OnInit {
  id: any;
  
  projectToView: any;
  currentUser: any;
  founderBoolean: boolean;
  adminBoolean: boolean;
  userBoolean: boolean;
  image: string;
  page: any;
  posts: any[];

  title: any;
  admins: any;
  contributors: any;
  resourceNeeds: any[];
  country: any;
  hostId: any;
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
  hostType: any;
  host: any;
  totalCompletion = 0;
  totalProgress = 0;
  rating: any;
  updatedAt: any;
  modal: any;
  constructor(private modalController: ModalController, private institutionService: InstitutionService, private userService: UserService, private navCtrl: NavController, private toastCtrl: ToastController, private alertController: AlertController, private router: Router, private sessionService: SessionService, private tokenStorage: TokenStorageService, private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initialise();
    this.tokenStorage.setProjectId(this.id);
    if(this.tokenStorage.getViewId() != undefined) {
      this.viewId = this.tokenStorage.getViewId().id;
    }
    
    this.page = "feed";
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
      this.hostId = this.projectToView.host;
      this.status = this.projectToView.status;
      this.SDGs = this.projectToView.SDGs;
      this.hostType = this.projectToView.hostType;
      this.rating = this.projectToView.rating;
      this.updatedAt = this.projectToView.updatedAt;
  },
  err => {
    console.log('********** View Projects.ts: ', err.error.msg);
  });
  this.host ={}
  if(this.hostType == "user") {
    this.userService.viewUserById(this.hostId).subscribe((res) => {
      this.host = {
        "id": res.data.targetUser.id,
        "name": res.data.targetUser.name,
        "username": res.data.targetUser.username,
        "type": "user",
        "profilePic": this.sessionService.getRscPath() + res.data.targetUser.ionicImg +'?random+=' + Math.random()
      }
    }, (err) => {
      console.log("View Project(get host) error: " + err.error.msg)
    })
  } else if (this.hostType ==  "institution") {
    this.institutionService.viewInstitutionById(this.hostId).subscribe((res) => {
      this.host = {
        "id": res.data.targetInstitution.id,
        "name": res.data.targetInstitution.name,
        "username": res.data.targetInstitution.username,
        "type": "institution",
        "profilePic": this.sessionService.getRscPath() + res.data.targetInstitution.ionicImg +'?random+=' + Math.random()
      }
    })
  }
  
  this.projectService.getKpi(this.id).subscribe((res)=>{
      this.kpis = res.data.kpis;
  },
  err=> {
    console.log('******* KPI retrieval error: ', err.error.msg);
  })
  this.projectService.getResourceNeeds(this.id).subscribe((res)=>{
    this.resourceNeeds = res.data.resourceneeds;
    if(this.resourceNeeds != undefined) {
      console.log("im running")
      this.totalCompletion = 0;
      this.totalProgress = 0;
      for(var i = 0; i < this.resourceNeeds.length; i++) {
          this.totalCompletion += this.resourceNeeds[i].completion
      }
      if(this.resourceNeeds.length != 0) {
          this.totalProgress = parseFloat(((this.totalCompletion/((this.resourceNeeds.length)*100))*100).toFixed(2));
      }
    }
    
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

this.projectService.getProjPost(this.id).subscribe((res) =>{
  this.posts = res.data.projectPosts;
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

  viewContri(ev) {
    this.router.navigate(["/contributions-management/" + this.id]);
  }

  viewComments(ev, postId) {
    this.router.navigate(['/view-comments/' + postId]);
  }

  viewAdminProfile(ev, a) {
    if(a.id == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      this.router.navigate(['/view-others-profile/' + a.username + "/user" ])
    }
    
  }

  viewFounderProfile(ev, h) {
    if(h.id == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      this.router.navigate(['/view-others-profile/' + h.username + "/" + h.type ])
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
					},
					error => {
            this.failureToast(error.error.msg);
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

  remove(ev, c) {
    console.log("test");
    this.projectService.removeResourceContribution(c.contributionId).subscribe((res)=> {
      this.successToast();
      this.projectService.getResourceContributions(this.id).subscribe((res)=>{
        this.contributions = res.data.contributions;
        console.log(this.contributions);
    },
    (err) => {
      console.log('******* Contributions retrieval error: ', err.error.msg);
    })


    },
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** ViewProjectPage(remove contributors).ts: ', err.error.msg);
    })
  }

  async presentAlertConfirm(ev, u) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to remove this contribution?',
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
            this.remove(ev, u);
          }
        }
      ]
    });

    await alert.present();
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  contribute(rn) {
    console.log(rn.id);
    this.router.navigate(["/create-project-request/" + rn.id + "/" + rn.type]);
  }

  async contributeMoney(resource) {
    this.modal = await this.modalController.create({
      component: CreateMoneyRequestPage,
      componentProps: {"resource": {"fundingTitle": resource.title, "fundingDesc": resource.desc}, "needId": resource.id}
      
    });
    this.modal.onWillDismiss().then((data) => {
  });
    return await this.modal.present();
  }

  renderImg(imgPath): any {
    return this.sessionService.getRscPath() + imgPath;
  }

}
