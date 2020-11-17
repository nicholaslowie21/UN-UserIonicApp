import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WriteTestimonialPage } from '../write-testimonial/write-testimonial.page';

@Component({
  selector: 'app-my-testimonials',
  templateUrl: './my-testimonials.page.html',
  styleUrls: ['./my-testimonials.page.scss'],
})
export class MyTestimonialsPage implements OnInit {
  id: string;
  type: string;
  segment: string;
  inStatus: string;
  incomingPendingTestimonialsList: any;
  requestData: { accountId: string; accountType: string; };
  outgoingPendingTestimonialsList: any;
  incomingRequestedTestimonialsList: any;
  incomingDismissedTestimonialsList: any;
  incomingCancelledTestimonialsList: any;
  outgoingRequestedTestimonialsList: any;
  outgoingDismissedTestimonialsList: any;
  outgoingCancelledTestimonialsList: any;
  outStatus: string;
  cancelData: any;
  acceptData: any;
  incomingOpenTestimonialsList: any;
  currentUser: any;
  accountType: any;
  accountBoolean: boolean;
  isVerified: boolean;
  incomingCloseTestimonialsList: any;
  outgoingGivenTestimonialsList: any;

  constructor(private activatedRoute: ActivatedRoute, 
    private testimonialService: TestimonialService,
    private sessionService: SessionService,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private popoverController: PopoverController,
    private tokenStorage:TokenStorageService,
    private router: Router) {
    this.segment = "open"
    this.inStatus = "requested"
    this.outStatus = "outrequested"

    this.currentUser = this.tokenStorage.getUser();
   
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      if(this.currentUser.data.user.isVerified == true) {
        this.isVerified = true;
      }
    } else if(this.accountType == "user") {
      if(this.currentUser.data.user.isVerified == "true") {
        this.isVerified = true;
      }
      this.accountBoolean = false;
    }
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.initialiseOutgoing();
    this.initialiseIncoming();
  }

  initialiseIncoming() {
    //pending project resource request(incoming)
    this.requestData = {
      "accountId": this.id,
      "accountType": this.type
    }

    this.testimonialService.getOpenedMyTestimonials(this.requestData).subscribe((res: any) => {
      this.incomingOpenTestimonialsList = res.data.testimonials;
      if(this.incomingOpenTestimonialsList != undefined) {
        for(var i = 0; i < this.incomingOpenTestimonialsList.length; i ++) {
          this.incomingOpenTestimonialsList[i].creatorImg = this.sessionService.getRscPath() + this.incomingOpenTestimonialsList[i].creatorImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Retrieve incoming Testimonials(requested) error: " + err.error.msg);
    })

    this.testimonialService.getRequestedMyTestimonials(this.requestData).subscribe((res: any) => {
      this.incomingRequestedTestimonialsList = res.data.testimonials;
      if(this.incomingRequestedTestimonialsList != undefined) {
        for(var i = 0; i < this.incomingRequestedTestimonialsList.length; i ++) {
          this.incomingRequestedTestimonialsList[i].creatorImg = this.sessionService.getRscPath() + this.incomingRequestedTestimonialsList[i].creatorImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Retrieve incoming Testimonials(requested) error: " + err.error.msg);
    })

    this.testimonialService.getPendingMyTestimonials(this.requestData).subscribe((res: any) => {
      this.incomingPendingTestimonialsList = res.data.testimonials;
      if(this.incomingPendingTestimonialsList != undefined) {
        for(var i = 0; i < this.incomingPendingTestimonialsList.length; i ++) {
          this.incomingPendingTestimonialsList[i].creatorImg = this.sessionService.getRscPath() + this.incomingPendingTestimonialsList[i].creatorImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Retrieve incoming Testimonials(pending) error: " + err.error.msg);
    })
    
    this.testimonialService.getCancelledMyTestimonials(this.requestData).subscribe((res: any) => {
      this.incomingCancelledTestimonialsList = res.data.testimonials;
      if(this.incomingCancelledTestimonialsList != undefined) {
        for(var i = 0; i < this.incomingCancelledTestimonialsList.length; i ++) {
          this.incomingCancelledTestimonialsList[i].creatorImg = this.sessionService.getRscPath() + this.incomingCancelledTestimonialsList[i].creatorImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************Retrieve incoming Testimonials(cancelled) error: " + err.error.msg);
    })

    this.testimonialService.getDismissedMyTestimonials(this.requestData).subscribe((res: any) => {
      this.incomingDismissedTestimonialsList = res.data.testimonials;
      if(this.incomingDismissedTestimonialsList != undefined) {
        for(var i = 0; i < this.incomingDismissedTestimonialsList.length; i ++) {
          this.incomingDismissedTestimonialsList[i].creatorImg = this.sessionService.getRscPath() + this.incomingDismissedTestimonialsList[i].creatorImg +'?random+=' + Math.random();
        }
      }
      
    }, (err) => {
      console.log("***************Retrieve incoming Testimonials(dismissed) error: " + err.error.msg);
    })

    this.testimonialService.getCloseMyTestimonials(this.requestData).subscribe((res: any) => {
      this.incomingCloseTestimonialsList = res.data.testimonials;
      if(this.incomingCloseTestimonialsList != undefined) {
        for(var i = 0; i < this.incomingCloseTestimonialsList.length; i ++) {
          this.incomingCloseTestimonialsList[i].creatorImg = this.sessionService.getRscPath() + this.incomingCloseTestimonialsList[i].creatorImg +'?random+=' + Math.random();
        }
      }
      
    }, (err) => {
      console.log("***************Retrieve incoming Testimonials(dismissed) error: " + err.error.msg);
    })
    

  }
  //testimonial requests by other people asking me
  initialiseOutgoing() {
    this.requestData = {
      "accountId": this.id,
      "accountType": this.type
    }
    this.testimonialService.getPendingOutgoingTestimonials(this.requestData).subscribe((res: any) => {
      this.outgoingPendingTestimonialsList = res.data.testimonials
      if(this.outgoingPendingTestimonialsList != undefined) {
        for(var i = 0; i < this.outgoingPendingTestimonialsList.length; i ++) {
          this.outgoingPendingTestimonialsList[i].targetImg = this.sessionService.getRscPath() + this.outgoingPendingTestimonialsList[i].targetImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("Retrieve outgoing Pending Testimonials List err: " + err.error.msg)
    })

    this.testimonialService.getRequestedOutgoingTestimonials(this.requestData).subscribe((res: any) => {
      this.outgoingRequestedTestimonialsList = res.data.testimonials
      if(this.outgoingRequestedTestimonialsList != undefined) {
        for(var i = 0; i < this.outgoingRequestedTestimonialsList.length; i ++) {
          this.outgoingRequestedTestimonialsList[i].targetImg = this.sessionService.getRscPath() + this.outgoingRequestedTestimonialsList[i].targetImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("Retrieve outgoing Requested Testimonials List err: " + err.error.msg)
    })

    this.testimonialService.getDismissedOutgoingTestimonials(this.requestData).subscribe((res:any) => {
      this.outgoingDismissedTestimonialsList = res.data.testimonials
      if(this.outgoingDismissedTestimonialsList != undefined) {
        for(var i = 0; i < this.outgoingDismissedTestimonialsList.length; i ++) {
          this.outgoingDismissedTestimonialsList[i].targetImg = this.sessionService.getRscPath() + this.outgoingDismissedTestimonialsList[i].targetImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("Retrieve outgoing Dismissed Testimonials List err: " + err.error.msg)
    })

    this.testimonialService.getOpenedOutgoingTestimonials(this.requestData).subscribe((res:any) => {
      this.outgoingGivenTestimonialsList = res.data.testimonials
      if(this.outgoingGivenTestimonialsList != undefined) {
        for(var i = 0; i < this.outgoingGivenTestimonialsList.length; i ++) {
          this.outgoingGivenTestimonialsList[i].targetImg = this.sessionService.getRscPath() + this.outgoingGivenTestimonialsList[i].targetImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("Retrieve outgoing Cancelled Testimonials List err: " + err.error.msg)
    })
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  cancelTestimonialRequest(t) {
    this.cancelData = {
      "testimonialId": t.id,
      "status": "close",
    }
    this.testimonialService.updateMyTestimonialStatus(this.cancelData).subscribe((res)=> {
      
      this.cancelSuccessToast();
      this.initialiseIncoming();
    }, (err) => {
      this.cancelFailureToast(err.error.msg);
    })
    }

  async cancelRequest(event, t)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to cancel this request',
			message: 'Confirm cancel Testimonial request?',
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
				this.cancelTestimonialRequest(t);
			  }
			}
			]
		});

		await alert.present(); 
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

  rejectTestimonialRequest(t) {
    this.cancelData = {
      "testimonialId": t.id,
      "status": "dismissed",
    }
    this.testimonialService.updateMyTestimonialStatus(this.cancelData).subscribe((res)=> {
      
      this.rejectSuccessToast();
      this.initialiseIncoming();
      this.initialiseOutgoing();
    }, (err) => {
      this.rejectFailureToast(err.error.msg);
    })
    }

  async rejectRequest(event, t)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to reject this testimonial?',
			message: 'Confirm reject Testimonial?',
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
				this.rejectTestimonialRequest(t);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async rejectSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Rejected successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async rejectFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Rejected Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  deleteTestimonialRequest(t) {
    this.cancelData = {
      "testimonialId": t.id,
      "status": "dismissed",
      "desc": t.desc
    }
    this.testimonialService.updateMyOutgoingTestimonialStatus(this.cancelData).subscribe((res)=> {
      
      this.rejectSuccessToast();
      this.initialiseIncoming();
      this.initialiseOutgoing();
    }, (err) => {
      this.rejectFailureToast(err.error.msg);
    })
    }

  async cancelOthersRequest(event, t)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to delete this request?',
			message: 'Confirm delete this request?',
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
				this.deleteTestimonialRequest(t);
			  }
			}
			]
		});

		await alert.present(); 
  }

  deleteWrittenTestimonialFromSystem(t) {
    this.cancelData = {
      "testimonialId": t.id,
      "status": "close",
      "desc": t.desc
    }
    this.testimonialService.updateMyOutgoingTestimonialStatus(this.cancelData).subscribe((res)=> {
      
      this.rejectSuccessToast();
      this.initialiseIncoming();
      this.initialiseOutgoing();
    }, (err) => {
      this.rejectFailureToast(err.error.msg);
    })
    }

  async deleteWrittenTestimonial(event, t)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to delete this testimonial?',
			message: 'Confirm delete this testimonial?',
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
				this.deleteWrittenTestimonialFromSystem(t);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async deleteSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Deleted successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async deleteFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Deleted Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async acceptTestimonial(event, t)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to accept this testimonial',
			message: 'Confirm accept Testimonial?',
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
				this.acceptTestimonialRequest(t);
			  }
			}
			]
		});

		await alert.present(); 
  }

  acceptTestimonialRequest(testimonial) {
    this.acceptData = {
      "testimonialId": testimonial.id,
      "status": "open"
    }
    this.testimonialService.updateMyTestimonialStatus(this.acceptData).subscribe((res)=> {
      
      this.acceptSuccessToast();
      this.initialiseIncoming();
      this.initialiseOutgoing();
    }, (err) => {
      this.acceptFailureToast(err.error.msg);
    })
  }

  async acceptSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Testimonial accepted successfully! Testimonial will be displayed in the "My Testimonial Tab',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async acceptFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Testimonial accepted Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async acceptWriteTestimonial(event, t)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to write this testimonial',
			message: 'Confirm write Testimonial?',
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
				this.presentPopover(event, t);
			  }
			}
			]
		});

		await alert.present(); 
  }

  ionPopoverDidDismiss() {
    console.log("yo");
    this.initialiseIncoming();
    this.initialiseOutgoing();
  }

  async presentPopover(ev: any, t) {
    const popover = await this.popoverController.create({
      component: WriteTestimonialPage,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps:{"testimonial": t},
      translucent: true
    });
    popover.onDidDismiss()
      .then(() => {
        this.initialiseIncoming();
        this.initialiseOutgoing();
    });
    return await popover.present();
    
  }

  async hideTestimonial(event, t)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to hide this testimonial',
			message: 'Confirm hide Testimonial?',
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
				this.hideTheTestimonial(t);
			  }
			}
			]
		});

		await alert.present(); 
  }

  hideTheTestimonial(testimonial) {
    this.acceptData = {
      "testimonialId": testimonial.id,
      "status": "close"
    }
    this.testimonialService.updateMyTestimonialStatus(this.acceptData).subscribe((res)=> {
      
      this.hideSuccessToast();
      this.initialiseIncoming();
      this.initialiseOutgoing();
    }, (err) => {
      this.hideFailureToast(err.error.msg);
    })
  }

  async hideSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Testimonial hidden successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async hideFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Testimonial hidden Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  viewProfile(ev, username, type) {
      this.router.navigate(['/view-others-profile/' + username + "/" + type ])

  }
  
}
