import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { TokenStorageService } from '../services/token-storage.service';
import { InstitutionService } from '../services/institution.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.page.html',
  styleUrls: ['./change-photo.page.scss'],
})
export class ChangePhotoPage implements OnInit {
  images: any;
  accountType: any;
  accountBoolean: boolean;
  currentImage: string;
  desc: string;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private userService: UserService, private router: Router, private toastCtrl: ToastController, private tokenStorage: TokenStorageService, private institutionService: InstitutionService, private camera:Camera, private file: File) {
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
      console.log(this.images);
    }
  }

  onSubmit(){
    const formData = new FormData();
    console.log(this.images);
    formData.append('profilePic', this.images);
    
    if(this.accountBoolean == true){
      this.institutionService.uploadProfilePicture(formData).subscribe(
        (res) => {
          this.successToast();
          this.router.navigateByUrl('/tabs/profile');
        },
        
        (err) => this.failureToast(err)
      );
    } else if(this.accountBoolean == false){
      this.userService.uploadProfilePicture(formData).subscribe(
        (res) => {
        this.successToast();
        this.router.navigateByUrl('/tabs/profile');
      },
        (err) => this.failureToast(err.message)
      );
    }
    
  }

  //initialise file reader
  //create a file reader to read contents of files using blob to specify data to read
  //create a imgblob which is used in previous step
  //append identity of file, blob and file name
  //call uploadpicture api
  readFile(file: any) {
    if(this.accountBoolean == false){
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('profilePic', imgBlob, file.name);
      
            this.userService.uploadCameraPicture(formData).subscribe(
              (res) => {
                this.successToast();
                this.router.navigateByUrl('/tabs/home');
              },
              (err) => this.failureToast(err)
            );
          };
          reader.readAsArrayBuffer(file);
      } else if(this.accountBoolean == true){
            const reader = new FileReader();
        reader.onloadend = () => {
          const imgBlob = new Blob([reader.result], {
            type: file.type
          });
          const formData = new FormData();
          formData.append('profilePic', imgBlob, file.name);
          
                this.institutionService.uploadCameraPicture(formData).subscribe((res) => {
                  this.successToast();
                  this.router.navigateByUrl('/tabs/home');
                },
                  (err) => this.failureToast(err)
                );
              };
              reader.readAsArrayBuffer(file);
    
      }
    }

  //calls function getPicture to take picture
  //Resolves the url of the file
  //takes the file and calls readfile function to read its contents
  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.readFile(file);
        });
      });
    }, (err) => {
      // Handle error
    });
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
