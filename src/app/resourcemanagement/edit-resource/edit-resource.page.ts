import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.page.html',
  styleUrls: ['./edit-resource.page.scss'],
})
export class EditResourcePage implements OnInit {
  updateForm: any;
  resourceId: any;
  resourceType: any;
  currResource: any;
  title: any;
  desc: any;
  country: any;
  address: any;

  resultSuccess: boolean;
  resultError: boolean;

  constructor(private resourceService: ResourceService, private sessionService: SessionService, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private toastCtrl: ToastController) {
    this.resultSuccess = false;
    this.resultError = false;
   }

  ngOnInit() {
    this.resourceId = this.activatedRoute.paramMap.subscribe(params => {
      this.resourceType = params.get('type');
      this.resourceId = params.get('id');
      console.log(this.resourceType + " " + this.resourceId);
    });

    if(this.resourceType == "manpower") {
      this.currResource = this.resourceService.viewManpowerResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.manpower;
        //Can call the other JSON parts if needed, like owner details

        // To check w BG, bcs not all of them hv image Path...
        // this.manpowerResource[i].imgPath = this.sessionService.getRscPath() + this.manpowerResource[i].imgPath  +'?random+=' + Math.random();
      }), err => {
        console.log('********** EditResource.ts - Manpower: ', err.error.msg);
      };
    } else if (this.resourceType == "knowledge") {
      this.currResource = this.resourceService.viewKnowledgeResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.knowledge;
      }), err => {
        console.log('********** EditResource.ts - Knowledge: ', err.error.msg);
      };
    } else if (this.resourceType == "item") {
      this.currResource = this.resourceService.viewItemResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.item;
      }), err => {
        console.log('********** EditResource.ts - Item: ', err.error.msg);
      };
    } else if (this.resourceType == "venue") {
      this.currResource = this.resourceService.viewVenueResourceDetail('5f6c2ce61a06684a78ae3dd9').subscribe((res) => {
        this.currResource = res.data.venue;
      }), (err) => {
        console.log('********** EditResource.ts - Venue: ', err.error.msg);
      };
    }
  }

  update() {
    this.updateForm= {
      "manpowerId": this.resourceId,
      "title": this.title,
      "desc": this.desc,
      "country": this.country,
    }
    
    this.resourceService.updateManpower(this.updateForm).subscribe((res) => {
      this.resultSuccess = true;
      this.resultError = false;
      this.successToast();
      this.back();
    },
    err => {
      this.resultSuccess = false;
      this.resultError = true;
      this.failureToast(err.error.msg);
      console.log('********** UpdateUserProfile.ts: ', err.error.msg);
    });
  }

  back() {
    this.router.navigateByUrl("/view-resource/" + this.resourceType + "/" + this.resourceId);
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Update successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Update Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
