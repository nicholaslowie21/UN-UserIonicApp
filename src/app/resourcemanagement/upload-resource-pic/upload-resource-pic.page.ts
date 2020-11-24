import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PaidresourceService } from 'src/app/services/paidresource.service';
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
  images: any;
  itemImages: any[];
  paidImages: any;

  constructor(private toastCtrl: ToastController, 
    private router:Router, 
    private activatedRoute: ActivatedRoute, 
    private resourceService: ResourceService, 
    private alertController: AlertController, 
    private sessionService: SessionService,
    private paidService: PaidresourceService) { }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    console.log(this.resourceType + " " + this.resourceId);
    if(this.resourceType == 'venue' || this.resourceType == "item" || this.resourceType == "paid") {
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
      const file = event.target.files;
      this.images = file;
      console.log(this.images);
    }

    if(this.resourceType == 'item' && event.target.files.length > 10 - this.itemImages.length) {
      this.failureToast("Maximum allowable images is 10!");
    }

    if(this.resourceType == 'venue' && event.target.files.length > 10 - this.venueImages.length) {
      this.failureToast("Maximum allowable images is 10!");
    }

    if(this.resourceType == 'paid' && event.target.files.length > 10 - this.paidImages.length) {
      this.failureToast("Maximum allowable images is 10!");
    }
  }

  initialise() {
    if(this.resourceType == "venue") {
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
          console.log('********** ViewResource.ts - Venue: ', err.error.msg);
        };

    } else if( this.resourceType == "item") {

        this.resourceService.viewItemResourceDetail(this.resourceId).subscribe((res) => {
          console.log(res);
          let itemImgPath = res.data.item.imgPath;
          this.itemImages = [];
          if (itemImgPath.length > 0) {
            for (var i = 0; i < itemImgPath.length; i++) {
              this.data= {
                "index": i,
                "name": "Item Image #" + (i + 1),
                "imgPath": this.sessionService.getRscPath() + itemImgPath[i] + '?random+=' + Math.random() 

              }
              this.itemImages[i] = this.data;
              
            }
          }
        }), err => {
          console.log('********** ViewResource.ts - Item: ', err.error.msg);
        };

    } else if(this.resourceType == "paid") {
      this.paidService.viewPaidResourceDetail(this.resourceId).subscribe((res) => {
        console.log(res);
        let paidImgPath = res.data.paidresource.imgPath;
        this.paidImages = [];
        if (paidImgPath.length > 0) {
          for (var i = 0; i < paidImgPath.length; i++) {
            this.data= {
              "index": i,
              "name": "Paid Resource Image #" + (i + 1),
              "imgPath": this.sessionService.getRscPath() + paidImgPath[i] + '?random+=' + Math.random() 

            }
            this.paidImages[i] = this.data;
            
          }
        }
      }), err => {
        console.log('********** ViewResource.ts - Paid: ', err.error.msg);
      };
    }
  }

  onSubmit(){
    const formData = new FormData();
    if(this.resourceType == 'item' && this.images.length <= 10 - this.itemImages.length) {
          console.log(this.image1);
          formData.append('itemId', this.resourceId);
            
          for (let i = 0; i < this.images.length; i++) {
              formData.append("itemPics", this.images[i]);
          }

          this.resourceService.uploadItemPic(formData).subscribe(
            (res) => {
              this.successToast();
              this.initialise();
            },
            
            (err) => this.failureToast(err.error.msg)
          );
    } else if(this.resourceType == 'venue' && this.images.length <= 10 - this.venueImages.length) {
      formData.append('venueId', this.resourceId);
      for (let i = 0; i < this.images.length; i++) {
        formData.append("venuePics", this.images[i]);
    }
  
      this.resourceService.uploadVenuePic(formData).subscribe(
        (res) => {
          this.successToast();
          this.initialise();
        },
        
        (err) => this.failureToast(err.error.msg)
      );
    } else if(this.resourceType == 'paid' && this.images.length <= 10 - this.paidImages.length) {
      formData.append('paidResourceId', this.resourceId);
      for (let i = 0; i < this.images.length; i++) {
        formData.append("paidResPics", this.images[i]);
    }
  
      this.paidService.uploadPaidResourcePic(formData).subscribe(
        (res) => {
          this.successToast();
          this.initialise();
        },
        
        (err) => this.failureToast(err.error.msg)
      );
    } else {
      this.failureToast("Maximum allowable images is 10!");
    }
  }


  back() {
    if(this.resourceType != "paid") {
      this.router.navigateByUrl("/view-resource/" + this.resourceType + "/" + this.resourceId);
    } else if(this.resourceType == "paid") {
      this.router.navigateByUrl("/view-paid-resource-details/" + this.resourceType + "/" + this.resourceId);
    }
    
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


  removeItemPic(m) {
    let removeData = {
      "itemId": this.resourceId,
      "indexes": [m],
    }
    console.log(m);
    this.resourceService.deleteItemPic(removeData).subscribe((res) => {
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

  removePaidPic(m) {
    let removeData = {
      "paidResourceId": this.resourceId,
      "indexes": [m],
    }
    console.log(m);
    this.paidService.deletePaidResourcePic(removeData).subscribe((res) => {
      this.successToast();
      this.initialise();
      // this.router.navigateByUrl("/view-resource/knowledge/" + this.resourceId);
    }
   ),
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** UploadResourcePic.ts - Paid Resource Pic Removal: ', err.error.msg);
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

  async presentItemAlertConfirm(ev, m) {
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
            this.removeItemPic(m);
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

  async presentPaidAlertConfirm(ev, m) {
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
            this.removePaidPic(m);
          }
        }
      ]
    });

    await alert.present();
  }


  async paidSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Update successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async paidFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Update Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }


}
