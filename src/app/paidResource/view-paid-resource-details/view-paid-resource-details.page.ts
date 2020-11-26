import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { PaidresourceService } from 'src/app/services/paidresource.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { PurchasePaidresourcePage } from '../purchase-paidresource/purchase-paidresource.page';

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
  modal: any;
  pendingRequests: any;
  noPendingRequestImage: boolean;
  acceptedRequests: any;
  declinedRequests: any;
  cancelledRequests: any;
  paidRequests: any;
  cancelData: { paidRequestId: any; status: string; };

  constructor(private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private paidService: PaidresourceService,
    private sessionService: SessionService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private modalController: ModalController) {
      this.requestType = "incoming";
    this.inStatus = "pending";
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
    this.initialiseRequests();
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

  async purchase(r) {
    this.modal = await this.modalController.create({
      component: PurchasePaidresourcePage,
      componentProps: {"paidResource": this.paidResource}
    });
    return await this.modal.present();
  }

  initialiseRequests() {
    //init pending
    this.paidService.getPaidResourceIncomingRequest({"paidResourceId": this.resourceId, "status": "pending" }).subscribe((res: any) => {
      this.pendingRequests = res.data.paidrequests

      if(this.pendingRequests != undefined) {
        for(var x = 0; x < this.pendingRequests.length; x++) {
          this.pendingRequests[x].buyerImg = this.sessionService.getRscPath() + this.pendingRequests[x].buyerImg +'?random+=' + Math.random();
        }
          
        }
    }, (err) => {
      console.log("Pending Requests error: " + err.error.msg)
    })

    //init accepted
    this.paidService.getPaidResourceIncomingRequest({"paidResourceId": this.resourceId, "status": "accepted" }).subscribe((res: any) => {
      this.acceptedRequests = res.data.paidrequests

      if(this.acceptedRequests != undefined) {
        for(var x = 0; x < this.acceptedRequests.length; x++) {
        this.acceptedRequests[x].buyerImg = this.sessionService.getRscPath() + this.acceptedRequests[x].buyerImg +'?random+=' + Math.random();
        }
          
      }
    }, (err) => {
      console.log("Accepted Requests error: " + err.error.msg)
    })

    //init declined
    this.paidService.getPaidResourceIncomingRequest({"paidResourceId": this.resourceId, "status": "declined" }).subscribe((res: any) => {
      this.declinedRequests = res.data.paidrequests
      if(this.declinedRequests != undefined) {
        for(var x = 0; x < this.declinedRequests.length; x++) {
          this.declinedRequests[x].buyerImg = this.sessionService.getRscPath() + this.declinedRequests[x].buyerImg +'?random+=' + Math.random();
         
          }
          
        }
    }, (err) => {
      console.log("Declined Requests error: " + err.error.msg)
    })

    //init cancelled
    this.paidService.getPaidResourceIncomingRequest({"paidResourceId": this.resourceId, "status": "cancelled" }).subscribe((res: any) => {
      this.cancelledRequests = res.data.paidrequests
      if(this.cancelledRequests != undefined) {
          for(var x = 0; x < this.cancelledRequests.length; x++) {
            this.cancelledRequests[x].buyerImg = this.sessionService.getRscPath() + this.cancelledRequests[x].buyerImg +'?random+=' + Math.random();
           
            }
            
          }
    }, (err) => {
      console.log("Cancelled Purchases error: " + err.error.msg)
    })

    //init paid purchases
    this.paidService.getPaidResourceIncomingRequest({"paidResourceId": this.resourceId, "status": "paid" }).subscribe((res: any) => {
      this.paidRequests= res.data.paidrequests
      if(this.paidRequests != undefined) {
          for(var x = 0; x < this.paidRequests.length; x++) {
            this.paidRequests[x].buyerImg = this.sessionService.getRscPath() + this.paidRequests[x].buyerImg +'?random+=' + Math.random();
           
            }
            
          }
    }, (err) => {
      console.log("Paid Requests error: " + err.error.msg)
    })
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  viewProfile(ev, p) {
    console.log(p);
      this.router.navigate(['/view-others-profile/' + p.buyerUsername + "/" + p.buyerType ]) 
  }

  viewProject(ev, p) {
    this.router.navigate(['/view-market-project-details/' + p.projectId]);
  }

  cancelPurchase(request) {
    this.cancelData = {
      "paidRequestId": request.id,
      "status": "cancelled"
    }
    this.paidService.updateSellerPaidResourceRequestStatus(this.cancelData).subscribe((res: any) => {
      this.cancelSuccessToast();
      this.initialiseRequests();
    }, (err) => {
      this.cancelFailureToast(err.error.msg)
      console.log("Cancel Purchase request(Pending to cancelled): " + err.error.msg)
    })
  }

  async presentCancelRequest(event, request)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to cancel this purchase',
			message: 'Confirm cancellation of purchase?',
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
          this.cancelPurchase(request);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async cancelSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Purchase cancelled successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async cancelFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Purchase cancelled Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  //accept purchase request
  acceptPurchase(request) {
    this.cancelData = {
      "paidRequestId": request.id,
      "status": "accepted"
    }
    this.paidService.updateSellerPaidResourceRequestStatus(this.cancelData).subscribe((res) => {
      this.acceptSuccessToast();
      this.initialiseRequests();
    }, (err) => {
      this.acceptFailureToast(err.error.msg)
      console.log("Accept Purchase request(Pending to accepted): " + err.error.msg)
    })
  }

  async presentAcceptRequest(event, request)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to accept this purchase',
			message: 'Confirm acceptance of purchase?',
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
          this.acceptPurchase(request);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async acceptSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Purchase has been accepted successfully! Buyer will be requested to make payment!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async acceptFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Purchase accepted Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  //decline Purchase Request
  declinePurchase(request) {
    this.cancelData = {
      "paidRequestId": request.id,
      "status": "declined"
    }
    this.paidService.updateSellerPaidResourceRequestStatus(this.cancelData).subscribe((res) => {
      this.declineSuccessToast();
      this.initialiseRequests();
    }, (err) => {
      this.declineFailureToast(err.error.msg)
      console.log("Decline Purchase request(Pending to decline): " + err.error.msg)
    })
  }

  async presentDeclineRequest(event, request)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to decline this purchase',
			message: 'Purchase will be declined and buyer will be informed!',
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
          this.declinePurchase(request);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async declineSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Purchase declined successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async declineFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Purchase declined Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
