import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-kpi',
  templateUrl: './create-kpi.page.html',
  styleUrls: ['./create-kpi.page.scss'],
})
export class CreateKpiPage implements OnInit {
  id: any;
  form: any;
  title: any;
  desc: any;
  resultSuccess: boolean;
  resultError: boolean;
  constructor(private toastCtrl: ToastController, private projectService: ProjectService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
  }

  back() {
    this.router.navigate(["/kpi-management/" + this.id]);
  }

  
  create() {

    this.form = {
    "title": this.title,
    "desc": this.desc,
    }
    this.projectService.createKpi(this.form, this.id).subscribe((res) => {
    this.resultSuccess = true;
    this.resultError = false;
    this.successToast();
    this.back();
    },
    err => {
    this.resultSuccess = false;
    this.resultError = true;
    this.failureToast(err.error.msg);
    console.log('********** CreateKpi.ts: ', err.error.msg);
    });
  } 

  async successToast() {
  let toast = this.toastCtrl.create({
  message: 'KPI Creation is successful!',
  duration: 2000,
  position: 'middle',
  cssClass: "toast-pass"      
  });
  (await toast).present();
  }

  async failureToast(error) {
  const toast = this.toastCtrl.create({
  message: 'KPI Creation Unsuccessful: ' + error,
  duration: 2000,
  position: 'middle',
  cssClass: "toast-fail"
  });
  (await toast).present();
  }


}
