import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { InstitutionService } from 'src/app/services/institution.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { RateContributorsPage } from '../rate-contributors/rate-contributors.page';

@Component({
  selector: 'app-resource-needs-management',
  templateUrl: './resource-needs-management.page.html',
  styleUrls: ['./resource-needs-management.page.scss'],
})
export class ResourceNeedsManagementPage implements OnInit {
  id: string;
  resourceNeeds: any[];
  resultSuccess: boolean;
  error: boolean;
  errorMessage: any;
  form: any;
  title: any;
  desc: any;
  total: number;
  completion: any;
  projectId: any;
  resultError: boolean;
  segment: string;
  reqData: any;
  outgoingResourceRequestList: any;
  noOutgoingRequestBoolean: boolean;
  incomingResourceRequestList: any;
  noIncomingRequestBoolean: boolean;
  inStatus: string;
  incomingPendingResourceRequestList: any;
  noIncomingPendingRequestBoolean: boolean;
  incomingAcceptedResourceRequestList: any;
  noIncomingAcceptedRequestBoolean: boolean;
  incomingDeclinedResourceRequestList: any;
  noIncomingDeclinedRequestBoolean: boolean;
  incomingCancelledResourceRequestList: any;
  noIncomingCancelledRequestBoolean: boolean;
  outStatus: string;
  outgoingPendingResourceRequestList: any;
  noOutgoingPendingRequestBoolean: boolean;
  outgoingAcceptedResourceRequestList: any;
  noOutgoingAcceptedRequestBoolean: boolean;
  outgoingDeclinedResourceRequestList: any;
  noOutgoingDeclinedRequestBoolean: boolean;
  outgoingCancelledResourceRequestList: any;
  noOutgoingCancelledRequestBoolean: boolean;
  modal: HTMLIonModalElement;

  constructor(private modalCtrl: ModalController, private institutionService: InstitutionService, private userService: UserService, private sessionService: SessionService, private marketplaceService: MarketplaceService, private toastCtrl: ToastController, private alertController: AlertController, private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService, ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectService.getResourceNeeds(this.id).subscribe((res) => {
        console.log(res);
        this.resourceNeeds = res.data.resourceneeds;
    },
    err => {
      console.log("**********Retrieve ResourceNeedsList.ts error")
    })
    this.segment = "needs";
    this.inStatus="pending";
    this.outStatus ="outpending";
    console.log(this.resourceNeeds);
    this.initialiseRequests();
  }

  back() {
    this.router.navigate(["/view-project/" + this.id]);
  }

  create(ev) {
    this.router.navigate(["/create-resource-need/" + this.id])
  }

  ionViewDidEnter() {
    this.refresh();
    this.initialiseRequests();
  }

  update(event, r) {
    this.router.navigate(["/update-resource-needs/" + r.id]);
  }

  refresh() {
    this.projectService.getResourceNeeds(this.id).subscribe((res) => {
      this.resourceNeeds = res.data.resourceneeds;
  },
  err => {
    console.log("**********Retrieve ResourceNeeds.ts error")
  })
  }

  markAsComplete(ev, r) {
    this.form = {
      "needId": r.id,
      "title": r.title,
      "desc": r.desc,
      "total": r.total,
      "completion": r.completion=100
      }
      this.projectService.updateResourceNeed(this.form).subscribe((res) => {
        this.projectId = res.data.projectId;
      this.resultSuccess = true;
      this.resultError = false;
      this.updateSuccessToast();
      this.back();
      },
      err => {
      this.resultSuccess = false;
      this.resultError = true;
      this.updateFailureToast(err.error.msg);
      console.log('********** UpdateResourceNeed.ts: ', err.error.msg);
      });
  }
  async updateSuccessToast() {
    let toast = this.toastCtrl.create({
    message: 'Resource Need Update is successful!',
    duration: 2000,
    position: 'middle',
    cssClass: "toast-pass"      
    });
    (await toast).present();
    }
  
    async updateFailureToast(error) {
    const toast = this.toastCtrl.create({
    message: 'Resource Need Update Unsuccessful: ' + error,
    duration: 2000,
    position: 'middle',
    cssClass: "toast-fail"
    });
    (await toast).present();
    }


  async delete(event, need)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to delete resource need',
			message: 'Confirm delete Resource Need?',
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
				this.projectService.deleteResourceNeed(need.id).subscribe(
					response => {
            this.resultSuccess = true;
            this.successToast();
            this.router.navigate(["/view-project/" + this.id]);
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

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  initialiseRequests() {
    this.reqData = {
      "id": this.id,
    }
    
    //pending project resource request(incoming)
    this.marketplaceService.viewPendingProjectProjectRequest(this.reqData).subscribe((res) => {
      this.incomingPendingResourceRequestList = res.data.projectPageProjectReqs;
      console.log(this.incomingPendingResourceRequestList);
      if(this.incomingPendingResourceRequestList != undefined) {
        this.noIncomingPendingRequestBoolean = false;
        for(var i = 0; i < this.incomingPendingResourceRequestList.length; i ++) {
          this.incomingPendingResourceRequestList[i].requesterImg = this.sessionService.getRscPath() + this.incomingPendingResourceRequestList[i].requesterImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Incoming Resource Request(pending) error: " + err.error.msg);
    })
    //accepted project resource request(incoming)
    this.marketplaceService.viewAcceptedProjectProjectRequest(this.reqData).subscribe((res) => {
      this.incomingAcceptedResourceRequestList = res.data.projectPageProjectReqs;
      if(this.incomingAcceptedResourceRequestList != undefined) {
        this.noIncomingAcceptedRequestBoolean = false;
        for(var i = 0; i < this.incomingAcceptedResourceRequestList.length; i ++) {
          this.incomingAcceptedResourceRequestList[i].requesterImg = this.sessionService.getRscPath() + this.incomingAcceptedResourceRequestList[i].requesterImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Incoming Resource Request(Accepted) error: " + err.error.msg);
    })
    //declined project resource request(incoming)
    this.marketplaceService.viewDeclinedProjectProjectRequest(this.reqData).subscribe((res) => {
      this.incomingDeclinedResourceRequestList = res.data.projectPageProjectReqs;
      if(this.incomingDeclinedResourceRequestList != undefined) {
        this.noIncomingDeclinedRequestBoolean = false;
        for(var i = 0; i < this.incomingDeclinedResourceRequestList.length; i ++) {
          this.incomingDeclinedResourceRequestList[i].requesterImg = this.sessionService.getRscPath() + this.incomingDeclinedResourceRequestList[i].requesterImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Incoming Resource Request(Accepted) error: " + err.error.msg);
    })
    //cancelled project project request(incoming)
    this.marketplaceService.viewCancelledProjectProjectRequest(this.reqData).subscribe((res) => {
      this.incomingCancelledResourceRequestList = res.data.projectPageProjectReqs;
      if(this.incomingCancelledResourceRequestList != undefined) {
        this.noIncomingCancelledRequestBoolean = false;
        for(var i = 0; i < this.incomingCancelledResourceRequestList.length; i ++) {
          this.incomingCancelledResourceRequestList[i].requesterImg = this.sessionService.getRscPath() + this.incomingCancelledResourceRequestList[i].requesterImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Incoming Resource Request(Accepted) error: " + err.error.msg);
    })


    //pending project resource request
    this.marketplaceService.viewPendingProjectResourceRequest(this.reqData).subscribe((res) => {
      this.outgoingPendingResourceRequestList = res.data.projectPageResourceReqs;
      console.log(this.outgoingPendingResourceRequestList);
      if(this.outgoingPendingResourceRequestList != undefined) {
        this.noOutgoingPendingRequestBoolean = false;
        for(var i = 0; i < this.outgoingPendingResourceRequestList.length; i ++) {
          this.outgoingPendingResourceRequestList[i].requesterImg = this.sessionService.getRscPath() + this.outgoingPendingResourceRequestList[i].requesterImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Outgoing Resource Request(pending) error: " + err.error.msg);
    })

    //accepted project resource request
    this.marketplaceService.viewAcceptedProjectResourceRequest(this.reqData).subscribe((res) => {
      this.outgoingAcceptedResourceRequestList = res.data.projectPageResourceReqs;
      console.log(this.outgoingAcceptedResourceRequestList);
      if(this.outgoingAcceptedResourceRequestList != undefined) {
        this.noOutgoingAcceptedRequestBoolean = false;
        for(var i = 0; i < this.outgoingAcceptedResourceRequestList.length; i ++) {
          this.outgoingAcceptedResourceRequestList[i].requesterImg = this.sessionService.getRscPath() + this.outgoingAcceptedResourceRequestList[i].requesterImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Outgoing Resource Request(Accepted) error: " + err.error.msg);
    })

    //declined project resource request
    this.marketplaceService.viewDeclinedProjectResourceRequest(this.reqData).subscribe((res) => {
      this.outgoingDeclinedResourceRequestList = res.data.projectPageResourceReqs;
      console.log(this.outgoingDeclinedResourceRequestList);
      if(this.outgoingDeclinedResourceRequestList != undefined) {
        this.noOutgoingDeclinedRequestBoolean = false;
        for(var i = 0; i < this.outgoingDeclinedResourceRequestList.length; i ++) {
          this.outgoingDeclinedResourceRequestList[i].requesterImg = this.sessionService.getRscPath() + this.outgoingDeclinedResourceRequestList[i].requesterImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Outgoing Resource Request(Declined) error: " + err.error.msg);
    })

    //cancelled project resource request
    this.marketplaceService.viewCancelledProjectResourceRequest(this.reqData).subscribe((res) => {
      this.outgoingCancelledResourceRequestList = res.data.projectPageResourceReqs;
      console.log(this.outgoingCancelledResourceRequestList);
      if(this.outgoingCancelledResourceRequestList != undefined) {
        this.noOutgoingCancelledRequestBoolean = false;
        for(var i = 0; i < this.outgoingCancelledResourceRequestList.length; i ++) {
          this.outgoingCancelledResourceRequestList[i].requesterImg = this.sessionService.getRscPath() + this.outgoingCancelledResourceRequestList[i].requesterImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Outgoing Resource Request(pending) error: " + err.error.msg);
    })
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  viewProfile(ev, h) {
    var username = "";
      if(h.ownerType == "institution") {
          this.institutionService.viewInstitutionById(h.ownerId).subscribe((res) => {
            username = res.data.targetInstitution.username
            this.router.navigate(['/view-others-profile/' + username + "/" + h.ownerType ])
          }, (err) => {
            console.log("View Founder Profile error: " + err.error.msg);
          })
      } else if(h.ownerType == "user") {
        this.userService.viewUserById(h.ownerId).subscribe((res) => {
          username = res.data.targetUser.username
          this.router.navigate(['/view-others-profile/' + username + "/" + h.ownerType ])
        }, (err) => {
          console.log("View Founder Profile error: " + err.error.msg);
        })
      }
      
    
  }

  viewResource(resource) {
    this.router.navigateByUrl("/view-resource/" + resource.resType + "/" + resource.resourceId);
  }

  viewSuggestions(r) {
    this.router.navigateByUrl("/resource-suggestions/" + r.id + "/" + r.type);
  }

  acceptProjectRequest(request) {
    this.marketplaceService.acceptProjectRequest(request.id).subscribe((res) => {
        this.acceptSuccessToast();
    }, (err) => {
      this.acceptFailureToast(err.error.msg);
    })
    this.router.navigate(["/view-project/" + this.id]);
  }

  /*completeProjectRequest(request) {
    this.marketplaceService.completeProjectRequest(request.id).subscribe((res) => {
      this.completeSuccessToast();
  }, (err) => {
    this.completeFailureToast(err.error.msg);
  })
  this.router.navigate(["/view-project/" + this.id]);
}*/

async completeProjectRequest(resource) {
  this.completeSuccessToast();
  console.log(this.id);
  this.modal = await this.modalCtrl.create({
    component: RateContributorsPage,
    componentProps: {"resource": {"resourceTitle": resource.resourceTitle, "requesterUsername": resource.requesterUsername, "requesterImg": resource.requesterImg}, 
    "projectId": this.id, 
    "reqId": resource.id,
    "ownerId": resource.ownerId,
    "ownerType": resource.ownerType,
    "requestType": "project"
  }
    
  });
  this.modal.onWillDismiss().then((data) => {
});
  return await this.modal.present();
}

async completeResourceRequest(resource) {
  this.completeSuccessToast();
  console.log(this.id);
  this.modal = await this.modalCtrl.create({
    component: RateContributorsPage,
    componentProps: {"resource": {"resourceTitle": resource.resourceTitle, 
    "requesterUsername": resource.resourceOwnerUsername, 
    "requesterImg": this.sessionService.getRscPath() + resource.resourceOwnerImg +'?random+=' + Math.random()}, 
    "projectId": this.id, 
    "reqId": resource.id,
    "ownerId": resource.resourceOwnerId,
    "ownerType": resource.resourceOwnerType,
    "requestType": "resource"}
    
  });
  this.modal.onWillDismiss().then((data) => {
});
  return await this.modal.present();
}

declineProjectRequest(request) {
  this.marketplaceService.declineProjectRequest(request.id).subscribe((res) => {
    this.declineSuccessToast();
}, (err) => {
  this.declineFailureToast(err.error.msg);
})
this.router.navigate(["/view-project/" + this.id]);
}

cancelProjectRequest(request) {
  this.marketplaceService.cancelProjectRequest(request.id).subscribe((res) => {
    this.cancelSuccessToast();
}, (err) => {
  this.cancelFailureToast(err.error.msg);
})
this.router.navigate(["/view-project/" + this.id]);
}

cancelResourceRequest(request) {
  console.log(request);
  this.marketplaceService.cancelResourceRequest(request.id).subscribe((res) => {
    this.cancelSuccessToast();
}, (err) => {
  this.cancelFailureToast(err.error.msg);
})
this.router.navigate(["/view-project/" + this.id]);
}

  async acceptSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Accepted successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async acceptFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Accepted Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async declineSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Declined successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async declineFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Declined Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async cancelSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Cancelled successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async cancelFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Cancelled Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async completeSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Completed successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async completeFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Completed Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async cancelResRequests(event, resource)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to cancel this request',
			message: 'Confirm delete Resource request?',
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
          console.log(resource);
				this.cancelResourceRequest(resource);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async cancelProjRequest(event, resource)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to cancel this request',
			message: 'Confirm cancel project request?',
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
				this.cancelProjectRequest(resource);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async acceptProjRequest(event, resource)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to accept this request',
			message: 'Confirm accept project request?',
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
				this.acceptProjectRequest(resource);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async declineProjRequest(event, resource)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to decline this request',
			message: 'Confirm decline project request?',
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
				this.declineProjectRequest(resource);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async completeProjRequest(event, resource)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to complete this request',
			message: 'Mark this request as completed only if the resource has been delivered! Has this resource been delivered?',
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
				this.completeProjectRequest(resource);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async completeResRequest(event, resource)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to complete this request',
			message: 'Mark this request as completed only if the resource has been delivered! Has this resource been delivered?',
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
				this.completeResourceRequest(resource);
			  }
			}
			]
		});

		await alert.present(); 
  }

}
