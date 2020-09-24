import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-resource-need',
  templateUrl: './create-resource-need.page.html',
  styleUrls: ['./create-resource-need.page.scss'],
})
export class CreateResourceNeedPage implements OnInit {
  id: string;
  form: any;
  title: any;
  desc: any;
  resultSuccess: boolean;
  resultError: boolean;
  resourceType: any;
  resourceTypes: string[];

  constructor(private toastCtrl: ToastController, private projectService: ProjectService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.resourceTypes =["manpower", "knowledge", "item", "venue", "money"];
  }

  back() {
    this.router.navigate(["/resource-needs-management/" + this.id]);
  }

  
  create() {
    if(this.resourceType == "money") {
      this.router.navigate(["/create-money-resource-need/" + this.id + "/" + this.title + "/" + this.desc]);
    } else {

    this.form = {
    "title": this.title,
    "desc": this.desc,
    "resourceType": this.resourceType
    }
    
    this.projectService.createResourceNeed(this.form, this.id).subscribe((res) => {
      console.log(res);
    this.resultSuccess = true;
    this.resultError = false;
    this.successToast();
    this.back();
    },
    err => {
    this.resultSuccess = false;
    this.resultError = true;
    this.failureToast(err.error.msg);
    console.log('********** CreateResourceNeed.ts: ', err.error.msg);
    });
  }
  } 

  async successToast() {
      let toast = this.toastCtrl.create({
      message: 'Resource Need Creation is successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
      });
      (await toast).present();
  }

  async failureToast(error) {
      const toast = this.toastCtrl.create({
      message: 'Resource Need Creation Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
      });
      (await toast).present();
  }

}
