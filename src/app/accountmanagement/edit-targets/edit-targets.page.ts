import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TargetService } from 'src/app/services/target.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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

  constructor(private tokenStorage: TokenStorageService,
    private targetService: TargetService,
    private toastCtrl: ToastController) {
    this.currentUser = this.tokenStorage.getUser();
   
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.currentUser);
   this.sdgs = this.currentUser.data.user.SDGs;
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

   }

  ngOnInit() {
  }

  filterSDGS(sdgs) {
    console.log(sdgs);
    this.rdata = {
      "SDGs": sdgs
    }

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

  onChange(target) {
    if(target.isChecked == false) {
      target.isChecked = true;
    } else if(target.isChecked == true) {
      target.isChecked = false;
    }
    console.log(target.isChecked)
    if(target.isChecked == true) {
      this.checkedTargets.push(target.id);
      console.log(this.checkedTargets)
    }
    
  }

  updateTargets() {
    this.updateData = {
      "targetIds": this.checkedTargets
    }
    this.targetService.updateAccountTargets(this.updateData).subscribe((res) => {
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
