import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ResourceService } from 'src/app/services/resource.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-upload-resource-pic',
  templateUrl: './upload-resource-pic.page.html',
  styleUrls: ['./upload-resource-pic.page.scss'],
})
export class UploadResourcePicPage implements OnInit {
  resourceId: any;
  resourceType: any;
  image1: any;
  file: any;
  venueImages: any[];
  data: { index: any; name: any; imgPath: any; };

  constructor(private toastCtrl: ToastController, private router:Router, private activatedRoute: ActivatedRoute, private resourceService: ResourceService, private alertController: AlertController, private sessionService: SessionService) { }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    console.log(this.resourceType + " " + this.resourceId);
    if(this.resourceType == 'venue') {
      this.initialise();
    }
  }

  ionViewDidEnter() {
    if (this.resourceType == 'venue') {
    this.initialise();
    }
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image1 = file;
      console.log(this.image1);
    }
  }

  initialise() {
    this.resourceService.viewVenueResourceDetail(this.resourceId).subscribe((res) => {
      let venueImgPath = res.data.venue.imgPath;
      this.venueImages = [];
      if (venueImgPath.length > 0) {
        for (var i = 0; i < venueImgPath.length; i++) {
          this.data= {
            "index": i,
            "name": "Venue Image #" + (i + 1),
            "imgPath": this.sessionService.getRscPath() + venueImgPath[i] + '?random+=' + Math.random() 

          }
          this.venueImages[i] = this.data;
          
        }
      }
    }), err => {
      console.log('********** ViewResource.ts - Manpower: ', err.error.msg);
    };
  }

  onSubmit(){
    const formData = new FormData();
    if(this.resourceType == 'item') {
    console.log(this.image1);
    formData.append('itemId', this.resourceId);
    formData.append('itemPic', this.image1);

    this.resourceService.uploadItemPic(formData).subscribe(
      (res) => {
        this.successToast();
        this.router.navigate(['/view-resource/'+ this.resourceType + "/" + this.resourceId]);
      },
      
      (err) => this.failureToast(err)
    );
    } else {
      console.log(this.image1);
      formData.append('venueId', this.resourceId);
      formData.append('venuePics', this.image1);
  
      this.resourceService.uploadVenuePic(formData).subscribe(
        (res) => {
          this.successToast();
          this.initialise();
        },
        
        (err) => this.failureToast(err)
      );
    }
  }


  back() {
    this.router.navigateByUrl("/view-resource/" + this.resourceType + "/" + this.resourceId);
  }

  remove(m) {
    let removeData = {
      "venueId": this.resourceId,
      "indexes": [m],
    }
    console.log(m);
    this.resourceService.deleteVenuePic(removeData).subscribe((res) => {
      this.successToast();
      this.initialise();
      // this.router.navigateByUrl("/view-resource/knowledge/" + this.resourceId);
    }
   ),
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** UploadResourcePic.ts - Venue Pic Removal: ', err.error.msg);
    };
  }

  async presentAlertConfirm(ev, m) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to remove this image?',
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
            this.remove(m);
          }
        }
      ]
    });

    await alert.present();
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
