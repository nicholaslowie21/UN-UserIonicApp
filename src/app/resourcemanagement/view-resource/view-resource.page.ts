import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from "@ionic-native/file/ngx";

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
  // fileTransfer: FileTransferObject;

  constructor(private navCtrl: NavController, private resourceService: ResourceService, private sessionService: SessionService, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController, private toastCtrl: ToastController, private file: File, private transfer: FileTransfer) {
    //See BG update project, for the toast
    this.retrieveResourceError = false;
    this.institutionKnowledgeOwner = false;
    
  
   }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    console.log(this.resourceType + " " + this.resourceId);

    this.initialise();
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.initialise();
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
      // PLS LOOK AT THIS AGAIN, AND FIX IT SO THAT WE CAN FETCH THE OWNERS
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
        this.currResource = res.data.item;
        if(res.data.item.owner == this.tokenStorageService.getUser().data.user.id) {
          this.yourAccountBoolean = true;
        }
        this.image = this.sessionService.getRscPath() + this.currResource.imgPath + '?random+=' + Math.random(); 
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

  toEditResource(event) {
    this.router.navigate(["/edit-resource/" + this.resourceType + "/" + this.resourceId]);
  }

  toEditOwners(event) {
    this.router.navigate(["/knowledge/edit-owners/" + this.resourceId]);
  }

  upload(event) {
    this.router.navigate(["/upload-resource-pic/" + this.resourceType + "/" + this.resourceId]);
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

}
