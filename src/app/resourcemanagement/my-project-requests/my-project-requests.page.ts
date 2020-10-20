import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { MarketplaceService } from 'src/app/services/marketplace.service';

@Component({
  selector: 'app-my-project-requests',
  templateUrl: './my-project-requests.page.html',
  styleUrls: ['./my-project-requests.page.scss'],
})
export class MyProjectRequestsPage implements OnInit {
  pendingProjectReqList: any;
  acceptedProjectReqList: any;
  cancelledProjectReqList: any;
  declinedProjectReqList: any;
  status: string;

  constructor(private alertController: AlertController, private toastCtrl: ToastController, private marketplaceService: MarketplaceService, private router: Router) { 
    this.status = "pending";
  }

  ngOnInit() {
    this.initialiseRequests();
    
  }

  ionViewDidEnter() {
    this.initialiseRequests();
  }

  initialiseRequests() {
    this.marketplaceService.viewConsolidatedPendingProjectReq().subscribe((res) => {
      this.pendingProjectReqList = res.data.projectReqs;
      console.log(this.pendingProjectReqList);
    
      
    }, (err) => {
      console.log("***************Outgoing Project Request error(Pending): " + err.error.msg);
    })
   

    this.marketplaceService.viewConsolidatedAcceptedProjectReq().subscribe((res) => {
      this.acceptedProjectReqList = res.data.projectReqs;
      console.log(this.acceptedProjectReqList);
      
    }, (err) => {
      console.log("***************Outgoing Project Request error(Accepted): " + err.error.msg);
    })
    
    this.marketplaceService.viewConsolidatedDeclinedProjectReq().subscribe((res) => {
      this.declinedProjectReqList = res.data.projectReqs;
      console.log(this.declinedProjectReqList);
      
    }, (err) => {
      console.log("***************Outgoing Resource Request error(Declined): " + err.error.msg);
    })

    this.marketplaceService.viewConsolidatedCancelledProjectReq().subscribe((res) => {
      this.cancelledProjectReqList= res.data.projectReqs;
      console.log(this.cancelledProjectReqList);
      
    }, (err) => {
      console.log("***************Outgoing Project Request error(Cancelled): " + err.error.msg);
    })

    
  }

  cancelProjectRequest(request) {
    this.marketplaceService.cancelProjectRequest(request.id).subscribe((res) => {
      this.cancelSuccessToast();
  }, (err) => {
    this.cancelFailureToast(err.error.msg);
  })
  this.router.navigateByUrl("/my-resources");
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

  viewProject(p) {
    this.router.navigate(['/view-market-project-details/' + p.projectId]);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
