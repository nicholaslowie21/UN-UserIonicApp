import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { TargetService } from 'src/app/services/target.service';

@Component({
  selector: 'app-edit-project-targets',
  templateUrl: './edit-project-targets.page.html',
  styleUrls: ['./edit-project-targets.page.scss'],
})
export class EditProjectTargetsPage implements OnInit {
  id: any;
  projectToUpdate: any;
  projectData: { projectId: any; };
  projectTargetIds: any[]=[];
  projectTargets: any;
  checkedTargets: any[]=[];
  retrieved: boolean;
  rdata: { SDGs: any; };
  targetsList: any[] =[];
  accountTargetIds: any[]=[];
  updateData: any;
  sdgs: any[] = [];
  sdgList: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
    private projectService: ProjectService,
    private targetService: TargetService,
    private toastCtrl: ToastController) { 
      this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectToUpdate = this.projectService.viewProject(this.id).subscribe((res)=> {
      this.projectToUpdate = res.data.targetProject;
      this.sdgList = this.projectToUpdate.SDGs
    },
    (err) => {
      console.log("******Retrieve Project error");
    });
    
    }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectToUpdate = this.projectService.viewProject(this.id).subscribe((res)=> {
      this.projectToUpdate = res.data.targetProject;
    },
    (err) => {
      console.log("******Retrieve Project error");
    });
    this.initialise();
  }


  initialise() {
    this.projectData = {
      "projectId": this.id
    }
    this.targetService.getProjectTargets(this.projectData).subscribe((res: any) => {
      this.projectTargets = res.data.targets;
      console.log(this.projectTargets);
        if(this.projectTargets!= undefined) {
          for(var i = 0; i < this.projectTargets.length; i++) {
            this.projectTargetIds.push(this.projectTargets[i].id);
          }
        }
        this.checkedTargets = this.projectTargetIds;
  }, (err) => {
    console.log("Get Account Targets List error: " + err.error.msg)
  })
  }

  filterSDGS(sdgs) {
    this.retrieved = true;
    console.log("i got triggered");
    this.rdata = {
      "SDGs": sdgs
    }
    this.targetService.getPossibleTargets(this.rdata).subscribe((res: any) => {
        this.targetsList = res.data.targets;
        if(this.targetsList != undefined) {
          for(var i = 0; i < this.targetsList.length; i++) {
            if(this.projectTargetIds.includes(this.targetsList[i].id)) {
              this.targetsList[i].isChecked = true;
            } else {
              this.targetsList[i].isChecked = false;
            }
            console.log(this.targetsList[i].isChecked);
          }
          console.log(this.targetsList);
        }
    }, (err) => {
      this.failureToast(err.error.msg);
    })
  }

  onChange(ev, target) {
    if(!this.checkedTargets.includes(target.id)) {
      console.log(this.checkedTargets)
      console.log(target.isChecked)
      if(target.isChecked == false) {
        const index = this.checkedTargets.indexOf(target.id)
        if (index > -1) {
          this.checkedTargets.splice(index, 1);
          console.log(this.checkedTargets)
        }
      } else if(target.isChecked == true) {
          this.checkedTargets.push(target.id);
          console.log(this.checkedTargets)
      }
    }
    if(this.checkedTargets.includes(target.id)&&target.isChecked==false) {
      const index = this.checkedTargets.indexOf(target.id)
        if (index > -1) {
          this.checkedTargets.splice(index, 1);
          console.log(this.checkedTargets)
        }
    }
    
  }

  updateTargets() {
    this.updateData = {
      "projectId": this.id,
      "targetIds": this.checkedTargets
    }
    this.targetService.updateProjectTargets(this.updateData).subscribe((res) => {
      this.successToast();
    }, (err) => {
      this.failureToast(err.error.msg);
    })
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
