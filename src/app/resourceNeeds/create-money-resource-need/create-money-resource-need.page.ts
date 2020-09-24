import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-create-money-resource-need',
  templateUrl: './create-money-resource-need.page.html',
  styleUrls: ['./create-money-resource-need.page.scss'],
})
export class CreateMoneyResourceNeedPage implements OnInit {

  id: string;
  form: any;
  title: any;
  desc: any;
  resultSuccess: boolean;
  resultError: boolean;
  resourceType: any;
  resourceTypes: string[];
  projectId: any;
  total: any;

  constructor(private tokenService: TokenStorageService, private toastCtrl: ToastController, private projectService: ProjectService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.projectId = this.tokenService.getProjectId()
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.desc = this.activatedRoute.snapshot.paramMap.get('desc');
    console.log(this.title);
    console.log(this.desc);
  }

  back() {
    this.router.navigate(["/resource-needs-management/" + this.projectId]);
  }

  
  create() {

    this.form = {
    "title": this.title,
    "desc": this.desc,
    "resourceType": "money",
    "total": this.total
    }
    
    this.projectService.createMoneyResourceNeed(this.form, this.id).subscribe((res) => {
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
