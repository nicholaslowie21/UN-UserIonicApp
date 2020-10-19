import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { InstitutionService } from 'src/app/services/institution.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rate-contributors',
  templateUrl: './rate-contributors.page.html',
  styleUrls: ['./rate-contributors.page.scss'],
})
export class RateContributorsPage implements OnInit {
  @Input("resource") resource
  @Input("projectId") projectId
  @Input("reqId") reqId
  @Input("ownerId") ownerId
  @Input("ownerType") ownerType
  @Input("requestType") requestType
  rating: any;
  image: any;
  data: { id: any; rating: any; };

  constructor(private userService: UserService, private institutionService: InstitutionService, private sessionService: SessionService, private router: Router, private toastCtrl: ToastController, private modalCtrl: ModalController, private marketplaceService: MarketplaceService) {
   }

  ngOnInit() {
    console.log(this.projectId)
    console.log(this.reqId);
  }


  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  rate() {
    if(this.requestType == "project") {
    this.data = {
      "id": this.reqId,
      "rating": this.rating
    }
    this.marketplaceService.completeProjectRequest(this.data).subscribe((res) => {
      this.completeSuccessToast();
  }, (err) => {
    this.completeFailureToast(err.error.msg);
  })
  this.dismiss();
  this.router.navigate(["/view-project/" + this.projectId]);
  }
   else if(this.requestType == "resource") {
     this.data = {
       "id": this.reqId,
       "rating": this.rating
     }
     this.marketplaceService.completeResourceRequest(this.data).subscribe((res) => {
      this.completeSuccessToast();
  }, (err) => {
    this.completeFailureToast(err.error.msg);
  })
  this.dismiss();
  this.router.navigate(["/view-project/" + this.projectId]);
   }
  }

  viewProfile() {
    var username = "";
      if(this.ownerType == "institution") {
          this.institutionService.viewInstitutionById(this.ownerId).subscribe((res) => {
            username = res.data.targetInstitution.username
            this.router.navigate(['/view-others-profile/' + username + "/" + this.ownerType ])
          }, (err) => {
            console.log("View Founder Profile error: " + err.error.msg);
          })
      } else if(this.ownerType == "user") {
        this.userService.viewUserById(this.ownerId).subscribe((res) => {
          username = res.data.targetUser.username
          this.router.navigate(['/view-others-profile/' + username + "/" + this.ownerType ])
        }, (err) => {
          console.log("View Founder Profile error: " + err.error.msg);
        })
      }
      this.dismiss();
      
    
  }

  async completeSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Rated successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async completeFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Rated Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
