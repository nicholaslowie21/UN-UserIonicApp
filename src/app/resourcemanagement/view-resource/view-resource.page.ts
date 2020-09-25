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
  resourceOwner: any;

  retrieveResourceError: boolean;

  constructor(private resourceService: ResourceService, private sessionService: SessionService, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute) {
    //See BG update project, for the toast
    this.retrieveResourceError = false;
  
   }

  ngOnInit() {

    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    console.log(this.resourceType + " " + this.resourceId);

    if(this.resourceType == "manpower") {
      this.currResource = this.resourceService.viewManpowerResourceDetail(this.resourceId).subscribe((res) => {
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
      this.currResource = this.resourceService.viewVenueResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.venue;
      }), (err) => {
        console.log('********** ViewResource.ts - Venue: ', err.error.msg);
      };
    }
  }

  toEditResource(event) {
    console.log("I am going to redirect you");
    this.router.navigateByUrl("/edit-resource/" + this.resourceType + "/" + this.resourceId);
  }
}
