import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TokenStorageService } from '../services/token-storage.service';
import { InstitutionService } from '../services/institution.service';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.page.html',
  styleUrls: ['./change-photo.page.scss'],
})
export class ChangePhotoPage implements OnInit {
  images: any;
  accountType: any;
  accountBoolean: boolean;

  constructor(private userService: UserService, private router: Router, private toastCtrl: ToastController, private tokenStorage: TokenStorageService, private institutionService: InstitutionService) {
    this.accountType = this.tokenStorage.getAccountType();
      if(this.accountType == "institution") {
        this.accountBoolean = true;
      } else if(this.accountType == "user") {
        this.accountBoolean = false;
      }
      console.log(this.accountBoolean);
   }

  ngOnInit() {
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('profilePic', this.images);
    if(this.accountBoolean == true){
      this.institutionService.uploadProfilePicture(formData).subscribe(
        (res) => 
        this.successToast(),
        (err) => this.failureToast(err)
      );
    } else if(this.accountBoolean == false){
      this.userService.uploadProfilePicture(formData).subscribe(
        (res) => 
        this.successToast(),
        (err) => this.failureToast(err)
      );
    }
    
  }

  back() {
    this.router.navigateByUrl('/tabs/home');
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
