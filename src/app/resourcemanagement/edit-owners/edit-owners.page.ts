import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { InstitutionService } from '../../services/institution.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-owners',
  templateUrl: './edit-owners.page.html',
  styleUrls: ['./edit-owners.page.scss'],
})
export class EditOwnersPage implements OnInit {
  resourceId: any;
  initialOwners: any[];
  owners: any[];
  finalOwners: any[];
  users: any[];
  words: string;
  userOwnersArray: any[];

  institutionOwnersArray: any[];
  ownersArray: any;
  addData: any;
  removeData: {};
  data: { name: any; id: any; isVerified: any; type: any, profilePic: string; };

  constructor(private resourceService: ResourceService, private sessionService: SessionService, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController, private toastCtrl: ToastController, private institutionService : InstitutionService, private userService: UserService) { }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');

    this.initialise();
  }

  ionViewDidEnter(){
    // check BG updateAdmin page
    this.initialise();
  }

  initialise() {
    this.resourceService.viewKnowledgeResourceDetail(this.resourceId).subscribe((res) => {
      this.ownersArray=[];
      this.userOwnersArray = [];
        if(res.data.userOwner != undefined) {
        for(var i = 0; i < res.data.userOwner.length; i++) {
              this.data ={
                "name": res.data.userOwner[i].name,
                "id": res.data.userOwner[i].id,
                "isVerified": res.data.userOwner[i].isVerified,
                "type": "user",
                "profilePic":  this.sessionService.getRscPath() + res.data.userOwner[i].ionicImg + '?random+=' + Math.random()
              }
              this.userOwnersArray[i] = this.data;
        }
      }
        this.institutionOwnersArray=[];
        console.log(res.data.institutionOwner);
        if(res.data.institutionOwner != undefined) {
        for(var i = 0; i < res.data.institutionOwner.length; i++) {
              this.data ={
                "name": res.data.institutionOwner[i].name,
                "id": res.data.institutionOwner[i].id,
                "isVerified": res.data.institutionOwner[i].isVerified,
                "type": "institution",
                "profilePic": this.sessionService.getRscPath() + res.data.institutionOwner[i].ionicImg + '?random+=' + Math.random()
              }
              this.institutionOwnersArray[i] = this.data;
        }
        this.ownersArray = this.userOwnersArray.concat(this.institutionOwnersArray);
      }
      /*for(var i = 0; i < this.initialOwners.length; i++) {
        // this.owners[i].imgPath = this.sessionService.getRscPath() + this.owners[i].imgPath  +'?random+=' + Math.random();
        if(this.initialOwners[i].ownerType == "user") {
          this.owners.push(this.userService.viewUserById(this.initialOwners[i].theId));
        } else {
          // this.owners.push(this.institutionService.viewInstitutionProfile(this.initialOwners[i].theId)); NEED TO INCL THE METHOD IN SERVICE
        }
      }*/
    },
    err => {
      console.log("**********Retrieve Owners.ts error")
    })
  }

  add(u) {
    console.log(u);
    this.addData = {
      "knowledgeId": this.resourceId,
      "userId": u.id,
      "targetType": u.type
    }
    this.resourceService.addKnowledgeOwner(this.addData).subscribe((res) => {
      this.successToast();
      this.router.navigateByUrl("/view-resource/knowledge/" + this.resourceId);
    },
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** AddKnowledgeOwnerPage.ts: ', err.error.msg);
    });
  }

  back() {
    this.router.navigateByUrl("/view-resource/knowledge/" + this.resourceId);
  }

  search(words) {
    this.institutionService.searchUser(words).subscribe((res) => {
      this.users = res.data.users;
    },
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** SearchUsers(Edit Owners page).ts: ', err.error.msg);
    });
  }

  remove(m) {
    this.removeData = {
      "knowledgeId": this.resourceId,
      "targetId": m.id,
      "targetType": m.type
    }
    this.resourceService.delKnowledgeOwner(this.removeData).subscribe((res) => {
      this.successToast();
      this.router.navigateByUrl("/view-resource/knowledge/" + this.resourceId);
    }
   ),
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** AffiliationManagementPage.ts: ', err.error.msg);
    };
  }

  async presentAlertConfirm(ev, m) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to remove this owner?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.remove(m);
          }
        }
      ]
    });

    await alert.present();
  }


  async successToast() {
    const toast = this.toastCtrl.create({
      message: 'Owner list updated successfully',
      duration: 1000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }
 
  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Owner list updated unsuccessfully: ' + error,
      duration: 1000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
