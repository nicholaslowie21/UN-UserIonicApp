import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.page.html',
  styleUrls: ['./view-comments.page.scss'],
})
export class ViewCommentsPage implements OnInit {
  updateForm: any;
  postId: any;
  currPost: any;
  comments: any[];
  currComment: any;
  currentUser: any;
  userImg: any;
  founderBoolean: boolean;
  adminBoolean: boolean;
  userBoolean: boolean;
  completedBoolean: boolean;

  resultSuccess: boolean;
  error: boolean;
  errorMessage: any;

  constructor(private projectService: ProjectService, private sessionService: SessionService, private alertController: AlertController, private tokenStorage: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
    this.userImg = this.sessionService.getRscPath() + this.currentUser.data.user.ionicImg +'?random+=' + Math.random();
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initialise();
  }

  initialise() {
    this.currComment="";
    this.currPost = this.projectService.getPostDetails(this.postId).subscribe((res) => {
      this.currPost = res.data.projectPost;
      if(this.currPost.imgPath != "") {
        this.currPost.imgPath = this.sessionService.getRscPath() + this.currPost.imgPath;
      }
      this.currPost.accountPic = this.sessionService.getRscPath() + this.currPost.accountPic;
      }
    ), err => {
      console.log('********** View Comments (Post Details).ts: ', err.error.msg);
    };

    this.projectService.getComments(this.postId).subscribe((res) => {
      this.comments = res.data.postComments;
      if(this.comments.length > 0) {
        for(var i = 0; i < this.comments.length; i++) {
          this.comments[i].accountPic = this.sessionService.getRscPath() + this.comments[i].accountPic;
        }
      }

      })
      
    // this.projectService.viewProject(this.currPost.projectId).subscribe(res => {
    //   console.log("I am fetching boolean data about project");
    //   let projectToView = res.data.targetProject;
    //   if(this.currentUser.data.user.id == projectToView.host) {
    //     this.founderBoolean = true;
    //   } else if(projectToView.admins.includes(this.currentUser.data.user.id)) {
    //     console.log("changed");
    //     this.adminBoolean = true;
    //   } else {
    //     this.userBoolean = true;
    //   }

    //   if(projectToView.status == "completed") {
    //     this.completedBoolean = true;
    //   } else {
    //     this.completedBoolean = false;
    //   }
    // })
      , err => {
      console.log('********** View Comments (Post Details).ts: ', err.error.msg);
    };
  }

  isCreator(username): boolean {
    if (username == this.currentUser.data.user.username) {
      return true;
    } else {
      return false;
    }
  }

  comment(form: NgForm) {
    this.projectService.createComment({'postId': this.postId, 'comment': this.currComment}). subscribe((res) =>{
      console.log("Comment posted successfully")
      form.reset();
      this.initialise();
    }, err => {
      console.log('*********Proj Comment Creation error: ', err.error.msg);
    }
    )
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  editPost(ev) {
    this.router.navigate(["/edit-post/" + this.postId]);
  }

  async delete(event, commentId)
	{
		const alert = await this.alertController.create({
			header: 'Confirm Delete Project Post Comment',
			message: 'Confirm delete Comment?',
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
				this.projectService.deleteComment(commentId).subscribe(
					response => {
            this.resultSuccess = true;
            this.successToast();
            this.initialise();
					},
					error => {
            this.failureToast(error.error.msg);
						this.error = true;
						this.errorMessage = error;
					}
				);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async delPost(event)
	{
		const alert = await this.alertController.create({
			header: 'Confirm Delete Project Post',
			message: 'Confirm delete Post?',
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
				this.projectService.deletePost(this.postId).subscribe(
					response => {
            this.resultSuccess = true;
            this.successToast();
            this.router.navigateByUrl("/view-project/" + this.currPost.projectId);
					},
					error => {
            this.failureToast(error.error.msg);
						this.error = true;
						this.errorMessage = error;
					}
				);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Deletion successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Deletion Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
