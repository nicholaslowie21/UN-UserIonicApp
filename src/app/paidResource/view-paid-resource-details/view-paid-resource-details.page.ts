import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PaidresourceService } from 'src/app/services/paidresource.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-view-paid-resource-details',
  templateUrl: './view-paid-resource-details.page.html',
  styleUrls: ['./view-paid-resource-details.page.scss'],
})
export class ViewPaidResourceDetailsPage implements OnInit {
  resourceId: string;
  resourceType: string;
  currentUser: any;
  id: any;
  paidResource: any;
  yourAccountBoolean: boolean = false;
  noPaidResourcePicBoolean: boolean;
  viewEntered = false;
  requestType: string;
  inStatus: string;
  outStatus: string;

  constructor(private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private paidService: PaidresourceService,
    private sessionService: SessionService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertController: AlertController) {
      this.requestType = "incoming";
    this.inStatus = "pending";
    this.outStatus = "pending";
     }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    this.initialise();
    console.log(this.resourceType);
    this.currentUser = this.tokenStorage.getUser();
    this.id = this.currentUser.data.user.id;
    console.log(this.resourceType + " " + this.resourceId);
    
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    console.log("i entered")
    this.initialise();
  }

 initialise() {
    this.paidResource = this.paidService.viewPaidResourceDetail(this.resourceId).subscribe((res) => {
      this.paidResource = res.data.paidresource
      console.log(res)
      if(res.data.paidresource.owner == this.id) {
        this.yourAccountBoolean = true;
      }
      this.paidResource.ownerImg = this.sessionService.getRscPath() + this.paidResource.ownerImg + '?random+=' + Math.random(); 
      if (this.paidResource.imgPath.length > 0) {
        for (var i = 0; i < this.paidResource.imgPath.length; i++) {
          this.paidResource.imgPath[i] = this.sessionService.getRscPath() + this.paidResource.imgPath[i] + '?random+=' + Math.random(); 
        }
        this.noPaidResourcePicBoolean = false;
      } else {
        this.noPaidResourcePicBoolean = true;
      }
      }), err => {
      console.log('********** ViewResource.ts - Item: ', err.error.msg);
    };
  }

  viewFounderProfile() {
    if(this.paidResource.ownerId == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      this.router.navigate(['/view-others-profile/' + this.paidResource.ownerUsername + "/" + this.paidResource.ownerType ])
    }
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
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
         this.paidService.deletePaidResource(this.resourceId).subscribe((res) => {
           this.successToast();
           this.router.navigateByUrl("/my-resources");
         }, (err) => {
           this.failureToast(err.error.msg);
         })
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
  
  toEditResource(event) {
    this.router.navigate(["/edit-resource/" + this.resourceType + "/" + this.resourceId]);
  }

  upload(event) {
    this.router.navigate(["/upload-resource-pic/" + this.resourceType + "/" + this.resourceId]);
  }

  requestResource(event) {
    this.tokenStorage.saveCurrResourceName(this.paidResource.title);
    this.router.navigate(["/request-resource/" + this.resourceType + "/" + this.resourceId]);
  }
}
