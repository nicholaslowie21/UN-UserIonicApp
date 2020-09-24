import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-admins',
  templateUrl: './view-admins.page.html',
  styleUrls: ['./view-admins.page.scss'],
})
export class ViewAdminsPage implements OnInit {
  id: string;
  admins: any;
  users: any;
  words: any;
  data: { userId: any; };

  constructor(private toastCtrl: ToastController, private alertController: AlertController, private router: Router, private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectService.getAdmins(this.id).subscribe((res) => {
      this.admins = res.data.admins;
  },
  err => {
    console.log("**********Retrieve Admins.ts error")
  })
  }

  back() {
    this.router.navigate(["/view-project/" + this.id]);
  }

  search(words) {
    this.projectService.searchUser(words).subscribe((res) => {
      this.users = res.data.users;
    },
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** SearchUsers(View admin page).ts: ', err.error.msg);
    });
  }

  add(u) {
    this.data = {
      "userId": u.id
    }
    this.projectService.addAdmin(this.data, this.id).subscribe((res) => {
      this.addSuccessToast();
      this.router.navigate(["/view-project/" + this.id]);
    },
    err => {
      console.log(err);
      this.addFailureToast(err.error.msg);
      console.log('********** AddProjectAdmin(View admin page).ts: ', err.error.msg);
    });
  }

  remove(u) {
    this.data = {
      "userId": u.id
    }
    this.projectService.deleteAdmin(this.data, this.id).subscribe((res) => {
      this.successToast();
      this.router.navigate(["/view-project/" + this.id]);
    },
    err => {
      console.log(err);
      this.failureToast(err.error.msg);
      console.log('********** RemoveProjectAdmin(View admin page).ts: ', err.error.msg);
    });
  }

  async presentAlertConfirm(ev, u) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to remove this admin?',
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
            this.remove(u);
          }
        }
      ]
    });

    await alert.present();
  }

  async successToast() {
    const toast = this.toastCtrl.create({
      message: 'Admin deleted successfully',
      duration: 1000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }
 
  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Admin deleted unsuccessfully: ' + error,
      duration: 1000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async addSuccessToast() {
    const toast = this.toastCtrl.create({
      message: 'Admin added successfully',
      duration: 1000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }
 
  async addFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Admin added unsuccessfully: ' + error,
      duration: 1000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
