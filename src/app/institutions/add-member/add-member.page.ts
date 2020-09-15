import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstitutionService } from 'src/app/services/institution.service';
import { AlertController, ToastController } from '@ionic/angular';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {
  users: any[];
  user: any;
  data: {};
  member: any;

  constructor(private router: Router, private institutionService: InstitutionService, private alertController: AlertController, private toastCtrl: ToastController, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.users = [{"userID": "5f533ff9780a7f7c117af43c", "name": "Jack Sim", "country": "Singapore"}, {"name": "Lucy Lu", "country": "Malaysia"}]
  }

  add(u) {
    console.log(u);
    this.data = {
      "userId": u.userID
    }
    this.institutionService.addMember(this.data).subscribe((res) => {
      this.successToast();
      this.router.navigateByUrl("/tabs/profile");
    }
   ),
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** AddInstitutionMemberPage.ts: ', err.error.msg);
    };
  }

  async presentAlertConfirm(ev,u) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to add this member?',
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
            this.add(u);
          }
        }
      ]
    });

    await alert.present();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeUsers();

    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  initializeUsers() {
    this.users = [{"userID": "5f527102fb5e4822bc9eacc0", "name": "Jack Sim", "country": "Singapore"}, {"name": "Lucy Lu", "country": "Malaysia"}]
  }
  async successToast() {
    const toast = this.toastCtrl.create({
      message: 'Member added successfully!',
      duration: 1000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }
 
  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Member added unsuccessfully: ' + error,
      duration: 1000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
