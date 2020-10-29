import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from "@ionic-native/file/ngx";
import { MarketplaceService } from 'src/app/services/marketplace.service';

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.page.html',
  styleUrls: ['./view-resource.page.scss'],
})
export class ViewResourcePage implements OnInit {
  resourceType: any;
  currResource: any;
  resourceId: any;
  resourceOwner: any;
  knowledgeOwners: any;
  image: any;
  venueImage: any[];
  ownerImg: any;
  institutionKnowledgeOwner: boolean;
  filePath: any;
  viewEntered = false;

  resultSuccess: boolean;
  error: boolean;
  errorMessage: any;
  retrieveResourceError: boolean;
  yourAccountBoolean: boolean;
  ownerIds: String[];
  userOwnersArray: any[];
  data: { name: any; isVerified: any; profilePic: any; };
  institutionOwnersArray: any[];
  ownersArray: any;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  noVenuePicBoolean: boolean;
  noItemPicBoolean: boolean;
  noIncomingRequestBoolean: boolean;
  noOutgoingRequestBoolean: boolean;
  requestType: any;
  reqData: any;
  incomingResourceRequestList: any;
  outgoingResourceRequestList: any;
  inStatus: string;
  outStatus: string;
  outgoingPendingResourceRequestList: any;
  noOutgoingPendingRequestBoolean: boolean;
  outgoingAcceptedResourceRequestList: any;
  noOutgoingAcceptedRequestBoolean: boolean;
  outgoingDeclinedResourceRequestList: any;
  noOutgoingDeclinedRequestBoolean: boolean;
  outgoingCancelledResourceRequestList: any;
  noOutgoingCancelledRequestBoolean: boolean;
  incomingPendingResourceRequestList: any;
  noIncomingPendingRequestBoolean: boolean;
  incomingAcceptedResourceRequestList: any;
  noIncomingAcceptedRequestBoolean: boolean;
  incomingDeclinedResourceRequestList: any;
  noIncomingDeclinedRequestBoolean: boolean;
  incomingCancelledResourceRequestList: any;
  noIncomingCancelledRequestBoolean: boolean;
  currentUser: any;
  id: string;
  suggestions: any;
  suggest: any;

  constructor(private navCtrl: NavController, 
    private resourceService: ResourceService, 
    private sessionService: SessionService, 
    private tokenStorageService: TokenStorageService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private alertController: AlertController, 
    private toastCtrl: ToastController, 
    private file: File, 
    private transfer: FileTransfer,
    private marketplaceService: MarketplaceService, private tokenStorage: TokenStorageService) {
    //See BG update project, for the toast
    this.retrieveResourceError = false;
    this.institutionKnowledgeOwner = false;
    this.requestType = "incoming";
    this.inStatus = "pending";
    this.outStatus = "pending";

   }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    this.currentUser = this.tokenStorage.getUser();
    this.id = this.currentUser.data.user.id;
    console.log(this.resourceType + " " + this.resourceId);
    this.initialise();
    this.initialiseRequests();
    this.initialiseSuggestions();
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.initialise();
    this.initialiseRequests();
    this.initialiseSuggestions();
  }

  initialise() {
    this.ownerIds = [];
    this.yourAccountBoolean = false;
    if(this.resourceType == "manpower") {
      this.currResource = this.resourceService.viewManpowerResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.manpower;
        if(res.data.manpower.owner == this.tokenStorageService.getUser().data.user.id) {
          this.yourAccountBoolean = true;
        }
        this.image = this.sessionService.getRscPath() + res.data.owner.ionicImg + '?random+=' + Math.random();
      }), err => {
        console.log('********** ViewResource.ts - Manpower: ', err.error.msg);
      };
      
      this.resourceOwner = this.resourceService.viewManpowerResourceDetail(this.resourceId).subscribe((res) => {
        this.resourceOwner = res.data.owner;
        this.ownerImg = this.image;
        // this.ownerImg = this.sessionService.getRscPath() + this.resourceOwner.ionicImg + '?random+=' + Math.random();
    }), err => {
        console.log('********** ViewResource.ts - ManpowerOwner: ', err.error.msg);
      };

    } else if (this.resourceType == "knowledge") {
      this.currResource = this.resourceService.viewKnowledgeResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.knowledge;
        for(var o = 0; o < res.data.knowledge.owner.length; o++) {
          this.ownerIds[o] = res.data.knowledge.owner[o].theId;
        }
        if(this.ownerIds.includes(this.tokenStorageService.getUser().data.user.id)) {
          this.yourAccountBoolean = true;
        }
        this.userOwnersArray=[];
        if(res.data.userOwner != undefined) {
        for(var i = 0; i < res.data.userOwner.length; i++) {
              this.data ={
                "name": res.data.userOwner[i].name,
                "isVerified": res.data.userOwner[i].isVerified,
                "profilePic":  this.sessionService.getRscPath() + res.data.userOwner[i].ionicImg + '?random+=' + Math.random()
              }
              this.userOwnersArray[i] = this.data;
        }
      }
        this.institutionOwnersArray=[];
        if(res.data.institutionOwner != undefined) {
        for(var i = 0; i < res.data.institutionOwner.length; i++) {
              this.data ={
                "name": res.data.institutionOwner[i].name,
                "isVerified": res.data.institutionOwner[i].isVerified,
                "profilePic": this.sessionService.getRscPath() + res.data.institutionOwner[i].ionicImg + '?random+=' + Math.random()
              }
              this.institutionOwnersArray[i] = this.data;
        }
      }

        this.ownersArray = this.userOwnersArray.concat(this.institutionOwnersArray);

        if (this.currResource.attachment != "") {
          this.filePath = this.sessionService.getRscPath() + this.currResource.attachment + '?random+=' + Math.random()
        } 
        }), err => {
        console.log('********** ViewResource.ts - Knowledge: ', err.error.msg);
      };

    } else if (this.resourceType == "item") {
      this.currResource = this.resourceService.viewItemResourceDetail(this.resourceId).subscribe((res) => {
        console.log(res);
        this.currResource = res.data.item;
        if(res.data.item.owner == this.tokenStorageService.getUser().data.user.id) {
          this.yourAccountBoolean = true;
        }
        if (this.currResource.imgPath.length > 0) {
          for (var i = 0; i < this.currResource.imgPath.length; i++) {
            this.currResource.imgPath[i] = this.sessionService.getRscPath() + this.currResource.imgPath[i] + '?random+=' + Math.random(); 
          }
          this.noItemPicBoolean = false;
        } else {
          this.noItemPicBoolean = true;
        }
        }), err => {
        console.log('********** ViewResource.ts - Item: ', err.error.msg);
      };

      this.resourceOwner = this.resourceService.viewItemResourceDetail(this.resourceId).subscribe((res) => {
        this.resourceOwner = res.data.owner;
        this.ownerImg = this.sessionService.getRscPath() + this.resourceOwner.ionicImg + '?random+=' + Math.random();
        }), err => {
        console.log('********** ViewResource.ts - ItemOwner: ', err.error.msg);
      };

    } else if (this.resourceType == "venue") {
      this.currResource = this.resourceService.viewVenueResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.venue;
        if(res.data.venue.owner == this.tokenStorageService.getUser().data.user.id) {
          this.yourAccountBoolean = true;
        }
        if (this.currResource.imgPath.length > 0) {
          for (var i = 0; i < this.currResource.imgPath.length; i++) {
            this.currResource.imgPath[i] = this.sessionService.getRscPath() + this.currResource.imgPath[i] + '?random+=' + Math.random(); 
          }
          this.noVenuePicBoolean = false;
        } else {
          this.noVenuePicBoolean = true;
        }
      }), (err) => {
      console.log('********** ViewResource.ts - Venue: ', err.error.msg);
      };

      this.resourceOwner = this.resourceService.viewVenueResourceDetail(this.resourceId).subscribe((res) => {
        this.resourceOwner = res.data.owner;
        this.ownerImg = this.sessionService.getRscPath() + this.resourceOwner.ionicImg + '?random+=' + Math.random();
        }), (err) => {
        console.log('********** ViewResource.ts - Venue: ', err.error.msg);
      };
    }
  }

  initialiseSuggestions() {
    this.suggest = {
      "id": this.resourceId,
      "resType": this.resourceType
    }
    this.marketplaceService.getResourceNeedSuggestionForResource(this.suggest).subscribe((res)=>{
      this.suggestions = res.data.resourceneedSuggestion
      if(this.suggestions.length > 0) {
        for(var i = 0; i < this.suggestions.length; i++) {
          this.suggestions[i].projectImg = this.sessionService.getRscPath() + this.suggestions[i].projectImg  +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************************Resource Need Suggestion Error: " + err.error.msg);
    })
  }

  contribute(rn) {
    console.log(rn.id);
    this.router.navigate(["/create-project-request/" + rn.id + "/" + rn.type]);
  }

  toEditResource(event) {
    this.router.navigate(["/edit-resource/" + this.resourceType + "/" + this.resourceId]);
  }

  toEditOwners(event) {
    this.router.navigate(["/knowledge/edit-owners/" + this.resourceId]);
  }

  upload(event) {
    this.router.navigate(["/upload-resource-pic/" + this.resourceType + "/" + this.resourceId]);
  }

  requestResource(event) {
    this.tokenStorageService.saveCurrResourceName(this.currResource.title);
    this.router.navigate(["/request-resource/" + this.resourceType + "/" + this.resourceId]);
  }

  download() {  
    //here encoding path as encodeURI() format. This filePath has the math random thing 
    let url = encodeURI(this.filePath);  
    let fileName = this.currResource.attachment.substring(this.currResource.attachment.lastIndexOf('/')+1);
    console.log(url);
    console.log(fileName);

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.externalRootDirectory + "/KoCoSD/" + fileName, true).then((entry) => {  
        //here logging our success downloaded file path in mobile.  
        console.log('download completed: ' + entry.toURL());  
        this.resultSuccess = true;
        this.downloadSuccessToast();
    }, (error) => {  
        //here logging our error its easier to find out what type of error occured.  
        console.log('download failed: ' + JSON.stringify(error));  
        this.downloadFailureToast(error);
        this.error = true;
        this.errorMessage = error;
    });  
} 

  pop($event) {
    this.navCtrl.pop();
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  viewProject(p) {
    this.router.navigate(['/view-market-project-details/' + p.projectId]);
  }
  
  async delete(event)
	{
		const alert = await this.alertController.create({
			header: 'Delete Resource',
			message: 'Confirm delete Resource?',
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
          if(this.resourceType == 'manpower') {
            this.resourceService.deleteManpower(this.resourceId).subscribe(
              response => {
                this.resultSuccess = true;
                this.successToast();
                this.router.navigateByUrl("/my-resources");
              },
              error => {
                this.failureToast(error);
                this.error = true;
                this.errorMessage = error;
              }
            );
			  } else if (this.resourceType == 'knowledge') {
          this.resourceService.deleteKnowledge(this.resourceId).subscribe(
            response => {
              this.resultSuccess = true;
              this.successToast();
              this.router.navigateByUrl("/my-resources");
            },
            error => {
              this.failureToast(error);
              this.error = true;
              this.errorMessage = error;
            }
          );
        } else if (this.resourceType == 'item') {
          this.resourceService.deleteItem(this.resourceId).subscribe(
            response => {
              this.resultSuccess = true;
              this.successToast();
              this.router.navigateByUrl("/my-resources");
            },
            error => {
              this.failureToast(error);
              this.error = true;
              this.errorMessage = error;
            }
          );
        } else if (this.resourceType == 'venue') {
          this.resourceService.deleteVenue(this.resourceId).subscribe(
            response => {
              this.resultSuccess = true;
              this.successToast();
              this.router.navigateByUrl("/my-resources");
            },
            error => {
              this.failureToast(error);
              this.error = true;
              this.errorMessage = error;
            }
          );
        }
			}}]
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

  /*download(ev, att) {
    console.log("https://192.168.86.250:8080" + att.attachment);
    var request: DownloadRequest = {
      uri: "https://192.168.86.250:8080" + att.attachment,
      title: att.name,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: 'MyFile.apk'
      }
  };
  this.downloader.download(request)
  .then((location: string) => console.log('File downloaded at:'+location))
  .catch((error: any) => console.error(error));

  }*/

  
  async downloadSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Download successful! The file is in the KoCoSD folder',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async downloadFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Download Unsuccessful: ' + error,
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
      "id": this.resourceId,
      "resType": this.resourceType
    }
    this.marketplaceService.viewPendingResourceProjectRequest(this.reqData).subscribe((res) => {
      this.outgoingPendingResourceRequestList = res.data.resourceProjectReqs;
      console.log(this.outgoingPendingResourceRequestList);
    
      
    }, (err) => {
      console.log("***************Outgoing Resource Request error(Pending): " + err.error.msg);
    })
   

    this.marketplaceService.viewAcceptedResourceProjectRequest(this.reqData).subscribe((res) => {
      this.outgoingAcceptedResourceRequestList = res.data.resourceProjectReqs;
      console.log(this.outgoingAcceptedResourceRequestList);
      
    }, (err) => {
      console.log("***************Outgoing Resource Request error(Accepted): " + err.error.msg);
    })

    console.log(this.noOutgoingAcceptedRequestBoolean);
    
    this.marketplaceService.viewDeclinedResourceProjectRequest(this.reqData).subscribe((res) => {
      this.outgoingDeclinedResourceRequestList = res.data.resourceProjectReqs;
      console.log(this.outgoingDeclinedResourceRequestList);
      
    }, (err) => {
      console.log("***************Outgoing Resource Request error(Declined): " + err.error.msg);
    })

    this.marketplaceService.viewCancelledResourceProjectRequest(this.reqData).subscribe((res) => {
      this.outgoingCancelledResourceRequestList = res.data.resourceProjectReqs;
      console.log(this.outgoingCancelledResourceRequestList);
      
    }, (err) => {
      console.log("***************Outgoing Resource Request error(Cancelled): " + err.error.msg);
    })

    this.marketplaceService.viewPendingResourceResourceRequest(this.reqData).subscribe((res) => {
      this.incomingPendingResourceRequestList = res.data.resourceResourceReqs;
      console.log(this.incomingPendingResourceRequestList);
      
    }, (err) => {
      console.log("***************Incoming Resource Request error(Pending): " + err.error.msg);
    })

    this.marketplaceService.viewAcceptedResourceResourceRequest(this.reqData).subscribe((res) => {
      this.incomingAcceptedResourceRequestList = res.data.resourceResourceReqs;
      console.log(this.incomingAcceptedResourceRequestList);
      
    }, (err) => {
      console.log("***************Incoming Resource Request error(Accepted): " + err.error.msg);
    })

    this.marketplaceService.viewDeclinedResourceResourceRequest(this.reqData).subscribe((res) => {
      this.incomingDeclinedResourceRequestList = res.data.resourceResourceReqs;
      console.log(this.incomingDeclinedResourceRequestList);
      
    }, (err) => {
      console.log("***************Incoming Resource Request error(Declined): " + err.error.msg);
    })

    this.marketplaceService.viewCancelledResourceResourceRequest(this.reqData).subscribe((res) => {
      this.incomingCancelledResourceRequestList = res.data.resourceResourceReqs;
      console.log(this.incomingCancelledResourceRequestList);
      
    }, (err) => {
      console.log("***************Incoming Resource Request error(Cancelled): " + err.error.msg);
    })
  
  }

  acceptResourceRequest(request) {
    this.marketplaceService.acceptResourceRequest(request.id).subscribe((res) => {
        this.acceptSuccessToast();
    }, (err) => {
      this.acceptFailureToast(err.error.msg);
    })
    this.router.navigateByUrl("/my-resources");
  }

  completeResourceRequest(request) {
    this.marketplaceService.completeResourceRequest(request.id).subscribe((res) => {
      this.completeSuccessToast();
  }, (err) => {
    this.completeFailureToast(err.error.msg);
  })
  this.router.navigateByUrl("/my-resources");
}

declineResourceRequest(request) {
  this.marketplaceService.declineResourceRequest(request.id).subscribe((res) => {
    this.declineSuccessToast();
}, (err) => {
  this.declineFailureToast(err.error.msg);
})
this.router.navigateByUrl("/my-resources");
}

cancelResourceRequest(request) {
  console.log(request.id);
  this.marketplaceService.cancelResourceRequest(request.id).subscribe((res) => {
    this.cancelSuccessToast();
}, (err) => {
  this.cancelFailureToast(err.error.msg);
})
this.router.navigateByUrl("/my-resources");
}

cancelProjectRequest(request) {
  this.marketplaceService.cancelProjectRequest(request.id).subscribe((res) => {
    this.cancelSuccessToast();
}, (err) => {
  this.cancelFailureToast(err.error.msg);
})
this.router.navigateByUrl("/my-resources");
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

async cancelResRequest(event, resource)
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

  async acceptResRequest(event, resource)
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
				this.acceptResourceRequest(resource);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async declineResRequest(event, resource)
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
				this.declineResourceRequest(resource);
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
