import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
  updateForm: any;
  postId: any;
  currPost: any;
  originalImg: any;

  message:any;
  resultSuccess: boolean;
  resultError: boolean; 

  constructor(private projectService: ProjectService, private sessionService: SessionService, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private toastCtrl: ToastController) {
    this.resultSuccess = false;
    this.resultError = false;
   }

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initialise();
  }

  initialise() {
    this.currPost = this.projectService.getPostDetails(this.postId).subscribe((res) => {
      this.currPost = res.data.projectPost;
      console.log(this.currPost.title);
      console.log(this.currPost.imgPath);
      if(this.currPost.imgPath != "") {
        console.log(this.currPost.imgPath);
        this.originalImg = this.sessionService.getRscPath() + res.data.projectPost.imgPath;
      } else {
        this.originalImg = "";
      }
      }
    ), err => {
      console.log('********** EditPost.ts: ', err.error.msg);
    };

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.currPost.imgPath = file;
    }
  }

  update(){
    const formData = new FormData();
    formData.append('postId', this.postId);
    formData.append('title', this.currPost.title);
    formData.append('desc', this.currPost.desc);
    formData.append('postImg', this.currPost.imgPath);

      this.projectService.updatePost(formData).subscribe(
        (res) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.successToast();
          // this.router.navigateByUrl("/view-project/" + this.postId);
          this.router.navigateByUrl('/tabs/profile');
        },
        
        (err) => {
          this.resultSuccess = false;
          this.resultError = true;
          this.failureToast(err.error.msg);
          console.log('************EditPost.ts: ', err.error.msg)
        }
      );
  }

  removePic(ev) {
    this.projectService.deletePostPic(this.postId).subscribe((res) => {
      this.initialise();
    }), 
    (err) => {
      this.failureToast(err.error.msg);
      console.log('************EditPost.ts: ', err.error.msg)
    }
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Edit successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Edit Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
