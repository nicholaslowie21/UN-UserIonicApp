import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaidresourceService } from 'src/app/services/paidresource.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-view-paid-resource-details',
  templateUrl: './view-paid-resource-details.page.html',
  styleUrls: ['./view-paid-resource-details.page.scss'],
})
export class ViewPaidResourceDetailsPage implements OnInit {
  resourceId: string;
  resourceType: string;
  currentUser: any;
  id: any;
  paidResource: any;
  yourAccountBoolean: boolean;
  noPaidResourcePicBoolean: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private paidService: PaidresourceService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    console.log(this.resourceType);
    this.currentUser = this.tokenStorage.getUser();
    this.id = this.currentUser.data.user.id;
    console.log(this.resourceType + " " + this.resourceId);
    this.initialise();
  }

  /*async ionViewDidEnter() {
    console.log("i entered")
    await this.initialise();
  }*/

 async initialise() {
    await this.paidService.viewPaidResourceDetail(this.resourceId).subscribe((res) => {
      this.paidResource = res.data.paidresource
      console.log(res)
      if(res.data.paidresource.owner == this.id) {
        this.yourAccountBoolean = true;
      }
      this.paidResource.ownerImg = this.sessionService.getRscPath() + this.paidResource.ownerImg + '?random+=' + Math.random(); 
      if (this.paidResource.imgPaths.length > 0) {
        for (var i = 0; i < this.paidResource.imgPaths.length; i++) {
          this.paidResource.imgPaths[i] = this.sessionService.getRscPath() + this.paidResource.imgPaths[i] + '?random+=' + Math.random(); 
        }
        this.noPaidResourcePicBoolean = false;
      } else {
        this.noPaidResourcePicBoolean = true;
      }
      }), err => {
      console.log('********** ViewResource.ts - Item: ', err.error.msg);
    };
  }

  viewFounderProfile() {
    if(this.paidResource.ownerId == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      this.router.navigate(['/view-others-profile/' + this.paidResource.ownerUsername + "/" + this.paidResource.ownerType ])
    }
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }
  

}
