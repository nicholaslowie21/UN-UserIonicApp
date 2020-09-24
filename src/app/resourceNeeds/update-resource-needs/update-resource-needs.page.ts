import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-update-resource-needs',
  templateUrl: './update-resource-needs.page.html',
  styleUrls: ['./update-resource-needs.page.scss'],
})
export class UpdateResourceNeedsPage implements OnInit {

  
  id: any;
  form: any;
  title: any;
  desc: any;
  resultSuccess: boolean;
  resultError: boolean;
  completion: any;
  projectId: any;
  resourceNeeds: any[];
  total: any;
  type: any;
  constructor(private tokenStorage: TokenStorageService, private toastCtrl: ToastController, private projectService: ProjectService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectId = this.tokenStorage.getProjectId();
    this.projectService.getResourceNeeds(this.projectId).subscribe((res)=>{
      this.resourceNeeds = res.data.resourceneeds;
      if(this.resourceNeeds != undefined){
        
        for(var i = 0; i < this.resourceNeeds.length; i++) {
          console.log(this.resourceNeeds[i].id);
            if(this.resourceNeeds[i].id == this.id) {
              
              this.title = this.resourceNeeds[i].title;
              this.desc = this.resourceNeeds[i].desc;
              this.total = this.resourceNeeds[i].total;
              this.completion = this.resourceNeeds[i].completion;
              this.type = this.resourceNeeds[i].type;
              this.total = this.resourceNeeds[i].total;
            }
        }
      }
      
    })
  }

  back() {
    this.projectId = this.tokenStorage.getProjectId();
    console.log(this.projectId)
    this.router.navigate(["/resource-needs-management/" + this.projectId]);
  }

  
  update() {

    this.form = {
    "needId": this.id,
    "title": this.title,
    "desc": this.desc,
    "total": this.total,
    "completion": this.completion
    }
    this.projectService.updateResourceNeed(this.form).subscribe((res) => {
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
    console.log('********** UpdateResourceNeed.ts: ', err.error.msg);
    });
  } 

  async successToast() {
  let toast = this.toastCtrl.create({
  message: 'Resource Need Update is successful!',
  duration: 2000,
  position: 'middle',
  cssClass: "toast-pass"      
  });
  (await toast).present();
  }

  async failureToast(error) {
  const toast = this.toastCtrl.create({
  message: 'Resource Need Update Unsuccessful: ' + error,
  duration: 2000,
  position: 'middle',
  cssClass: "toast-fail"
  });
  (await toast).present();
  }

}
