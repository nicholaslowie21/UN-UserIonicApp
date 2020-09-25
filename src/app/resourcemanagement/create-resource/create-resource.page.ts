import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ResourceService } from '../../services/resource.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.page.html',
  styleUrls: ['./create-resource.page.scss'],
})
export class CreateResourcePage implements OnInit {
  form: FormGroup;
  title: string;
  desc: string;
  address: string;
  type: string;
  typeList: String[]
  
  message: string;
  isChosenType: boolean;
  isVenueType: boolean;
  resultSuccess: boolean;
  resultError: boolean;

  constructor(private resourceService: ResourceService, private toastCtrl: ToastController, private router: Router) {
    this.resultSuccess = false;
    this.resultError = false;
    this.isVenueType = false;
    this.isChosenType = false;
   }

  ngOnInit() {
    this.typeList = ["Manpower", "Knowledge", "Item", "Venue"];
  }

  renderType(type: string) {
    if (type == "Venue") {
      this.isVenueType = true;
      this.isChosenType = true;
    } else {
      this.isVenueType = false;
      this.isChosenType = true;
    }
  }

  createRes(resourceForm:NgForm) {
    if (this.type == "Manpower") {
      this.resourceService.createManpowerResource(this.title, this.desc).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Manpower: ', err.error.msg);
      });
    } else if (this.type == "Knowledge") {
      this.resourceService.createKnowledgeResource(this.title, this.desc).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Knowledge: ', err.error.msg);
      });
    } else if(this.type == "Item"){
      this.resourceService.createItemResource(this.title, this.desc).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Item: ', err.error.msg);
      });
    } else if(this.type == "Venue") {
      this.resourceService.createVenueResource(this.title, this.desc, this.address).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Venue: ', err.error.msg);
      });
    }
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Resource is created successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Resource is created unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
