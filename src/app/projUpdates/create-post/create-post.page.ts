import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProjectService } from '../../services/project.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from  "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  form: FormGroup;
  projectId: any;
  title: any;
  content: any;
  image: any;

  message:string;
  resultSuccess: boolean;
  resultError: boolean;

  constructor(private projectService: ProjectService, private toastCtrl: ToastController, private router: Router, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService) {
    this.resultSuccess = false;
    this.resultError = false;
   }

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  selectImage(ev) {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.image = file;
      console.log(this.image);
    } else {
      // may need to make image empty string
    }
  }
  createPost(form:NgForm) {
    const formData = new FormData();
    formData.append('projectId', this.projectId);
    formData.append('title', this.title);
    formData.append('desc', this.content);
    formData.append('postImg', this.image);
    
    this.projectService.createPost(formData).subscribe((res) => {
      console.log(res);
      this.resultSuccess = true;
      this.resultError = false;
      form.reset();
      this.successToast();
      this.router.navigateByUrl('/view-project/' + this.projectId);
    },
    err => {
      this.resultSuccess = false;
      this.resultError = true;
      this.failureToast(err.error.msg);
      console.log('********** CreatePostPage.ts: ', err.error.msg);
    });
  }
  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Post created successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Post created unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
