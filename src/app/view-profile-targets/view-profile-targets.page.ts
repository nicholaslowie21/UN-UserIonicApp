import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TargetService } from '../services/target.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile-targets',
  templateUrl: './view-profile-targets.page.html',
  styleUrls: ['./view-profile-targets.page.scss'],
})
export class ViewProfileTargetsPage implements OnInit {
  // @Input("accountId") accountId
  // @Input("accountType") accountType
  // @Input("accountName") accountName
  accountId: any;
  accountType: any;
  accountName: any;
  currentUser: any;
  sdgs: any;
  accountBoolean: boolean;
  isVerified: boolean;
  accountData: { accountId: any; accountType: any; };
  accountTargets: any;
  accountTargetIds: any[] = [];
  isMyAccount: boolean;

  constructor(private tokenStorage: TokenStorageService,
    private targetService: TargetService,
    private modalCtrl: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit() {
    this.accountId = this.activatedRoute.snapshot.paramMap.get('Id');
    this.accountType = this.activatedRoute.snapshot.paramMap.get('type');
    this.accountName = this.activatedRoute.snapshot.paramMap.get('name');
    this.currentUser = this.tokenStorage.getUser();
    if(this.currentUser.data.user.id == this.accountId) {
      this.isMyAccount = true;
    } else {
      this.isMyAccount = false;
    }
    this.initialise();
  }

  initialise() {
    this.accountData = {
      "accountId": this.accountId,
      "accountType": this.accountType
    }
    this.targetService.getAccountTargets(this.accountData).subscribe((res) => {
        this.accountTargets = res.data.targets
        console.log(this.accountTargets);
        if(this.accountTargets!= undefined) {
          for(var i = 0; i < this.accountTargets.length; i++) {
            this.accountTargetIds.push(this.accountTargets[i].id);
          }
        }
    }, (err) => {
      console.log("Get Account Targets List error: " + err.error.msg)
    })
  }

  // dismiss() {
  //   this.modalCtrl.dismiss({
  //     'dismissed': true
  //   });
  // }

}
