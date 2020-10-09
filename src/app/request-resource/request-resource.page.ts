import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ResourceService } from '../services/resource.service';
import { MarketplaceService } from '../services/marketplace.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ProjectService } from '../services/project.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from  "@angular/router";

@Component({
  selector: 'app-request-resource',
  templateUrl: './request-resource.page.html',
  styleUrls: ['./request-resource.page.scss'],
})
export class RequestResourcePage implements OnInit {
  form: FormGroup;
  resourceId: any;
  resourceType: any;
  resourceName: any;
  desc: any;
  address: any;
  projectList: any;
  currProject: any;
  projectResourceNeed: any;
  resourceNeedOption: any[];
  resourceNeed: any;
  accountType: any;
  accountBoolean: boolean;
  user: any;

  message: string;
  isAuto: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  
  constructor(private resourceService: ResourceService, private marketplaceService: MarketplaceService, private projectService: ProjectService, private toastCtrl: ToastController, private router: Router, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService) {
    this.accountType = this.tokenStorage.getAccountType();
    this.user = this.tokenStorage.getUser().data.user;
    this.resourceName = this.tokenStorage.getCurrResourceName();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else if(this.accountType == "user") {
      this.accountBoolean = false;
    }

    this.resultSuccess = false;
    this.resultError = false;
    this.isAuto= false;
   }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');

    this.marketplaceService.getAccountProjects({"id":this.user.id, "type": this.accountType}).subscribe((res) => {
      this.projectList = res.data.theProjects;
    }), err => {
      console.log('********** RequestResource(Proj List).ts: ', err.error.msg);
    }

  }

  renderResourceNeed(currProject) {
    this.resourceNeedOption = [{"id": "0", "title": "Not created yet"}];
    this.projectService.getResourceNeeds(currProject).subscribe ((res) => {
      this.projectResourceNeed = res.data.resourceneeds;
      if (this.projectResourceNeed.length > 0) {
        
        for(var i = 0; i < this.projectResourceNeed.length; i++) {
          this.resourceNeedOption.push({
            "id": this.projectResourceNeed[i].id,
            "title": this.projectResourceNeed[i].title
          }
          )
        }
      }
    }),
    err => {
      console.log('********** RequestResource(Resource Needs).ts: ', err.error.msg);
    };
  }

  create() {
    if (this.resourceType != 'knowledge') {
      console.log("I want to create at" + this.resourceNeed);
      if (this.resourceNeed != '0') {
        var createForm = {
          "needId": this.resourceNeed,
          "resourceId": this.resourceId,
          "resType": this.resourceType,
          "desc": this.desc
        }

        this.marketplaceService.createNonKnowledgeResReq(createForm).subscribe((res)=> {
          this.resultSuccess = true;
            this.resultError = false;
            this.successToast();
            this.router.navigateByUrl('/view-marketplace-resources');
          },
          err => {
            this.resultSuccess = false;
            this.resultError = true;
            this.failureToast(err.error.msg);
            console.log('********** RequestResource (NonKnowledge).ts: ', err.error.msg);
          });
      } else {
        var createAutoForm = {
          "resourceId": this.resourceId,
          "projectId": this.currProject,
          "resType": this.resourceType,
          "desc": this.desc
        }

        console.log("I am at auto");

        this.marketplaceService.createAutoNonKnowledgeResReq(createAutoForm).subscribe((res)=> {
          this.resultSuccess = true;
            this.resultError = false;
            this.successToast();
            this.router.navigateByUrl('/view-marketplace-resources');
          },
          err => {
            this.resultSuccess = false;
            this.resultError = true;
            this.failureToast(err.error.msg);
            console.log('********** RequestResource(NonKnowledge Auto).ts: ', err.error.msg);
          });
      }
    } else {
      if(this.resourceNeed != '0') {
        var createKnowledgeForm = {
          "resourceId": this.resourceId,
          "needId": this.resourceNeed,
          "desc": this.desc
        }

        this.marketplaceService.createKnowledgeResReq(createKnowledgeForm).subscribe((res)=> {
          this.resultSuccess = true;
            this.resultError = false;
            this.successToast();
            this.router.navigateByUrl('/view-marketplace-resources');
          },
          err => {
            this.resultSuccess = false;
            this.resultError = true;
            this.failureToast(err.error.msg);
            console.log('********** RequestResource(Knowledge).ts: ', err.error.msg);
          });
      } else {
        var createAutoKnowledgeForm = {
          "resourceId": this.resourceId,
          "projectId": this.currProject,
          "desc": this.desc
        }

        console.log("I am at auto");

        this.marketplaceService.createAutoKnowledgeResReq(createAutoKnowledgeForm).subscribe((res)=> {
          this.resultSuccess = true;
            this.resultError = false;
            this.successToast();
            this.router.navigateByUrl('/view-marketplace-resources');
          },
          err => {
            this.resultSuccess = false;
            this.resultError = true;
            this.failureToast(err.error.msg);
            console.log('********** RequestResource(Knowledge Auto).ts: ', err.error.msg);
          });
      }

    }
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Request successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Request Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
