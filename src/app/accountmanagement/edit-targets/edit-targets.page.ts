import { Component, OnInit} from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TargetService } from 'src/app/services/target.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-targets',
  templateUrl: './edit-targets.page.html',
  styleUrls: ['./edit-targets.page.scss'],
})
export class EditTargetsPage implements OnInit {
  currentUser: any;
  accountType: any;
  accountBoolean: boolean;
  isVerified: boolean;
  sdgs: any;
  data: any;
  targetsList: any;
  checkedTargets: any[] = [];
  updateData: { targetIds: any[]; };
  rdata: { SDGs: any; };
  accountData: {};
  accountTargets: any[] = [];
  accountTargetIds: any[] =[];
  sdgList: any;
  retrieved: boolean;

  constructor(private tokenStorage: TokenStorageService,
    private targetService: TargetService,
    private toastCtrl: ToastController,
    private router: Router) {
    this.currentUser = this.tokenStorage.getUser();
   
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.currentUser);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      if(this.currentUser.data.user.isVerified == true) {
        this.isVerified = true;
      }
    } else if(this.accountType == "user") {
      if(this.currentUser.data.user.isVerified == "true") {
        this.isVerified = true;
      }
      this.accountBoolean = false;
    }
    console.log(this.accountBoolean);
    this.retrieved = false;
   }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
   
    this.accountType = this.tokenStorage.getAccountType();
    console.log(this.currentUser);
    this.sdgList = this.currentUser.data.user.SDGs;
     if(this.accountType == "institution") {
       this.accountBoolean = true;
       if(this.currentUser.data.user.isVerified == true) {
         this.isVerified = true;
       }
     } else if(this.accountType == "user") {
       if(this.currentUser.data.user.isVerified == "true") {
         this.isVerified = true;
       }
       this.accountBoolean = false;
     }
     console.log(this.accountBoolean);
    this.initialise();
  }

  initialise() {
    this.accountData = {
      "accountId": this.currentUser.data.user.id,
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
        this.checkedTargets = this.accountTargetIds;
    }, (err) => {
      console.log("Get Account Targets List error: " + err.error.msg)
    })
  }

  filterSDGS(sdgs) {
    this.retrieved = true;
    console.log(sdgs);
    this.rdata = {
      "SDGs": sdgs
    }
    this.targetService.getPossibleTargets(this.rdata).subscribe((res: any) => {
        this.targetsList = res.data.targets;
        if(this.targetsList != undefined) {
          for(var i = 0; i < this.targetsList.length; i++) {
            if(this.accountTargetIds.includes(this.targetsList[i].id)) {
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

    // this.targetService.getPossibleTargets(this.rdata).subscribe((res) => {
    //   this.targetsList = res.data.targets
    //   if(this.targetsList != undefined) {
    //     for(var i = 0; i < this.targetsList.length; i++) {
    //       this.targetsList[i].isChecked = false
    //     }
    //   }
    // }, (err) => {
    //   console.log("****************View Possible Targets.page.ts error: " + err.error.msg);
    // })
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
      "targetIds": this.checkedTargets
    }
    this.targetService.updateAccountTargets(this.updateData).subscribe((res) => {
      this.successToast();
      this.router.navigate(['/view-profile-targets/' + this.currentUser.data.user.id + "/" + this.accountType + "/" + this.currentUser.data.user.name]);
      //this.router.navigate(['/tabs/profile'])
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
