import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { TargetService } from 'src/app/services/target.service';

@Component({
  selector: 'app-view-project-targets',
  templateUrl: './view-project-targets.page.html',
  styleUrls: ['./view-project-targets.page.scss'],
})
export class ViewProjectTargetsPage implements OnInit {
  @Input("projectId") projectId
  @Input("projectName") projectName
  projectData: { projectId: any; };
  projectTargets: any[]=[];
  projectTargetIds: any[]=[];

  constructor(private projectService: ProjectService, private targetService: TargetService,
    private modalCtrl: ModalController) { 
  }

  ngOnInit() {
    this.initialise();
  }

  initialise() {
    this.projectData = {
      "projectId": this.projectId,
    }
    this.targetService.getProjectTargets(this.projectData).subscribe((res) => {
        this.projectTargets = res.data.targets
        console.log(this.projectTargets);
        if(this.projectTargets!= undefined) {
          for(var i = 0; i < this.projectTargets.length; i++) {
            this.projectTargetIds.push(this.projectTargets[i].id);
          }
        }
    }, (err) => {
      console.log("Get Project Targets List error: " + err.error.msg)
    })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
