import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { InstitutionService } from 'src/app/services/institution.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.page.html',
  styleUrls: ['./edit-rating.page.scss'],
})
export class EditRatingPage implements OnInit {
  @Input("contribution") contribution
  @Input("resId") resId
  @Input("contributorId") contributorId
  @Input("contributorType") contributorType
  @Input("resource") resource
  image: any;
  data: { contributionId: any; rating: any; };
  rating: any;

  constructor(private userService: UserService, private institutionService: InstitutionService, private sessionService: SessionService, private router: Router, private toastCtrl: ToastController, private modalCtrl: ModalController, private projectService: ProjectService) {
   }

  ngOnInit() {
    this.rating = this.contribution.rating
    console.log(typeof(this.rating))
    console.log(this.resId)
    console.log(this.contributorId);
    console.log(this.contributorType);
  }


  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  rate() {
    this.data = {
      "contributionId": this.contribution.contributionId,
      "rating": this.rating
    }
    this.projectService.updateContributionRating(this.data).subscribe((res) => {
      this.completeSuccessToast();
  }, (err) => {
    this.completeFailureToast(err.error.msg);
  })
  this.dismiss();
  }

  viewProfile() {
    var username = "";
      if(this.contributorType == "institution") {
          this.institutionService.viewInstitutionById(this.contribution.contributorId).subscribe((res) => {
            username = res.data.targetInstitution.username
            this.router.navigate(['/view-others-profile/' + username + "/" + this.contributorType ])
          }, (err) => {
            console.log("View Founder Profile error: " + err.error.msg);
          })
      } else if(this.contributorType == "user") {
        this.userService.viewUserById(this.contribution.contributorId).subscribe((res) => {
          username = res.data.targetUser.username
          this.router.navigate(['/view-others-profile/' + username + "/" + this.contributorType ])
        }, (err) => {
          console.log("View Founder Profile error: " + err.error.msg);
        })
      }
      this.dismiss();
      
    
  }

  async completeSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Rating Edited successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async completeFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Rating Edited Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

}
