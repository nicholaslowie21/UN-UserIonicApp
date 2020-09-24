import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-upload-project-pic',
  templateUrl: './upload-project-pic.page.html',
  styleUrls: ['./upload-project-pic.page.scss'],
})
export class UploadProjectPicPage implements OnInit {
  images: any;
  accountBoolean: boolean;
  file: any;
  id: any;

  constructor(private toastCtrl: ToastController, private router:Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
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
    formData.append('projectId', this.id);
    formData.append('projectPic', this.images);
    
    
      this.projectService.uploadProjectPicture(formData).subscribe(
        (res) => {
          this.successToast();
          this.router.navigate(['/view-project/'+ this.id]);
        },
        
        (err) => this.failureToast(err)
      );
  
    
  }

  back() {
    this.router.navigate(["/view-project/" + this.id]);
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
