import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-update-kpi',
  templateUrl: './update-kpi.page.html',
  styleUrls: ['./update-kpi.page.scss'],
})
export class UpdateKpiPage implements OnInit {

  id: any;
  form: any;
  title: any;
  desc: any;
  resultSuccess: boolean;
  resultError: boolean;
  completion: any;
  projectId: any;
  kpis: any[];
  constructor(private tokenStorage: TokenStorageService, private toastCtrl: ToastController, private projectService: ProjectService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectId = this.tokenStorage.getProjectId();
    this.projectService.getKpi(this.projectId).subscribe((res)=>{
      this.kpis = res.data.kpis;
      if(this.kpis != undefined){
        for(var i = 0; i < this.kpis.length; i++) {
            if(this.kpis[i].id == this.id) {
              this.title = this.kpis[i].title;
              this.desc = this.kpis[i].desc;
              this.completion = this.kpis[i].completion;
            }
        }
      }
      
    })
  }

  back() {
    this.projectId = this.tokenStorage.getProjectId();
    console.log(this.projectId)
    this.router.navigate(["/kpi-management/" + this.projectId]);
  }

  
  update() {

    this.form = {
    "kpiId": this.id,
    "title": this.title,
    "desc": this.desc,
    "completion": this.completion
    }
    this.projectService.updateKpi(this.form).subscribe((res) => {
      this.projectId = res.data.projectId;
    this.resultSuccess = true;
    this.resultError = false;
    this.successToast();
    this.back();
    },
    err => {
    this.resultSuccess = false;
    this.resultError = true;
    this.failureToast(err.error.msg);
    console.log('********** UpdateKpi.ts: ', err.error.msg);
    });
  } 

  async successToast() {
  let toast = this.toastCtrl.create({
  message: 'KPI Update is successful!',
  duration: 2000,
  position: 'middle',
  cssClass: "toast-pass"      
  });
  (await toast).present();
  }

  async failureToast(error) {
  const toast = this.toastCtrl.create({
  message: 'KPI Update Unsuccessful: ' + error,
  duration: 2000,
  position: 'middle',
  cssClass: "toast-fail"
  });
  (await toast).present();
  }

}
