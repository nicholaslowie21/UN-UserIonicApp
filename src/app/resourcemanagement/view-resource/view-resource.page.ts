import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.page.html',
  styleUrls: ['./view-resource.page.scss'],
})
export class ViewResourcePage implements OnInit {
  resourceType: any;
  currResource: any;
  resourceId: any;
  resourceOwner

  retrieveResourceError: boolean;

  constructor(private resourceService: ResourceService, private sessionService: SessionService, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.retrieveResourceError = false;
  
    // this.resourceType = this.tokenStorageService.getCurrResourceType;
    // this.currResource = this.tokenStorageService.getCurrResource;
   }

  ngOnInit() {

    this.resourceId = this.activatedRoute.paramMap.subscribe(params => {
      this.resourceType = params.get('type');
      this.resourceId = params.get('id');
      console.log(this.resourceType + " " + this.resourceId);

    });

    if(this.resourceType == "manpower") {
      this.currResource = this.resourceService.viewManpowerResourceDetail('5f6c2b4b1a06684a78ae3dd8').subscribe((res) => {
        this.currResource = res.data.manpower;
        //Can call the other JSON parts if needed, like owner details

        // To check w BG, bcs not all of them hv image Path...
        // this.manpowerResource[i].imgPath = this.sessionService.getRscPath() + this.manpowerResource[i].imgPath  +'?random+=' + Math.random();
      }), err => {
        console.log('********** ViewResource.ts - Manpower: ', err.error.msg);
      };
    } else if (this.resourceType == "knowledge") {
      this.currResource = this.resourceService.viewKnowledgeResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.knowledge;
      }), err => {
        console.log('********** ViewResource.ts - Knowledge: ', err.error.msg);
      };
    } else if (this.resourceType == "item") {
      this.currResource = this.resourceService.viewItemResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.item;
      }), err => {
        console.log('********** ViewResource.ts - Item: ', err.error.msg);
      };
    } else if (this.resourceType == "venue") {
      this.currResource = this.resourceService.viewVenueResourceDetail('5f6c2ce61a06684a78ae3dd9').subscribe((res) => {
        this.currResource = res.data.venue;
      }), err => {
        console.log('********** ViewResource.ts - Venue: ', err.error.msg);
      };
    }
    // this.projectToUpdate = this.projectService.viewProject(this.id).subscribe((res)=> {
    //   this.projectToUpdate = res.data.targetProject;
    // },
    // (err) => {
    //   console.log("******Retrieve Project error");
    // });
  }

}
