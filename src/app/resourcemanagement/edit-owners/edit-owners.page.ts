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
      this.initialOwners = res.owner;
      console.log(this.owners);
      for(var i = 0; i < this.initialOwners.length; i++) {
        // this.owners[i].imgPath = this.sessionService.getRscPath() + this.owners[i].imgPath  +'?random+=' + Math.random();
        if(this.initialOwners[i].ownerType == "user") {
          this.owners.push(this.userService.viewUserProfile(this.initialOwners[i].theId));
        } else {
          // this.owners.push(this.institutionService.viewInstitutionProfile(this.initialOwners[i].theId)); NEED TO INCL THE METHOD IN SERVICE
        }
      }
    },
    err => {
      console.log("**********Retrieve Owners.ts error")
    })
  }

  back() {
    this.router.navigateByUrl("/view-resource/knowledge" + this.resourceId);
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
