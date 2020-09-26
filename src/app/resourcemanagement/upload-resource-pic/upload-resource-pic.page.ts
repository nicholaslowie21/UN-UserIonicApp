import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-upload-resource-pic',
  templateUrl: './upload-resource-pic.page.html',
  styleUrls: ['./upload-resource-pic.page.scss'],
})
export class UploadResourcePicPage implements OnInit {
  resourceId: any;
  resourceType: any;
  image1: any;
  image2: any;
  file: any;

  constructor(private toastCtrl: ToastController, private router:Router, private activatedRoute: ActivatedRoute, private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    console.log(this.resourceType + " " + this.resourceId);
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image1 = file;
      console.log(this.image1);
    }
  }

  selectImage2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image2 = file;
      console.log(this.image2);
    }
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
      formData.append('venuePics', this.image2);
  
        this.resourceService.uploadVenuePic(formData).subscribe(
          (res) => {
            this.successToast();
            this.router.navigate(['/view-resource/'+ this.resourceType + "/" + this.resourceId]);
          },
          
          (err) => this.failureToast(err)
        );
    }
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
