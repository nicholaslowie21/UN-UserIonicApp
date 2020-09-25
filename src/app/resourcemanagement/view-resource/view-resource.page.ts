import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";
import { AlertController, ToastController } from '@ionic/angular';

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

  resultSuccess: boolean;
  error: boolean;
  errorMessage: any;
  retrieveResourceError: boolean;

  constructor(private resourceService: ResourceService, private sessionService: SessionService, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController, private toastCtrl: ToastController) {
    //See BG update project, for the toast
    this.retrieveResourceError = false;
  
   }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    console.log(this.resourceType + " " + this.resourceId);

    this.initialise();
  }

  ionViewDidEnter() {
    this.initialise();
  }

  initialise() {
    if(this.resourceType == "manpower") {
      this.currResource = this.resourceService.viewManpowerResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.manpower;
        //Can call the other JSON parts if needed, like owner details

        // To check w BG, bcs not all of them hv image Path...
        // this.manpowerResource[i].imgPath = this.sessionService.getRscPath() + this.manpowerResource[i].imgPath  +'?random+=' + Math.random();
      }), err => {
        console.log('********** ViewResource.ts - Manpower: ', err.error.msg);
      };
    } else if (this.resourceType == "knowledge") {
      this.currResource = this.resourceService.viewKnowledgeResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.knowledge;
      }), err => {
        console.log('********** ViewResource.ts - Knowledge: ', err.error.msg);
      };
    } else if (this.resourceType == "item") {
      this.currResource = this.resourceService.viewItemResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.item;
      }), err => {
        console.log('********** ViewResource.ts - Item: ', err.error.msg);
      };
    } else if (this.resourceType == "venue") {
      this.currResource = this.resourceService.viewVenueResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.venue;
      }), (err) => {
        console.log('********** ViewResource.ts - Venue: ', err.error.msg);
      };
    }
  }

  toEditResource(event) {
    this.router.navigate(["/edit-resource/" + this.resourceType + "/" + this.resourceId]);
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

}
