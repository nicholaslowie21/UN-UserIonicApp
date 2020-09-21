import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { InstitutionService } from '../services/institution.service';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.page.html',
  styleUrls: ['./my-projects.page.scss'],
})
export class MyProjectsPage implements OnInit {
  currProjects : any[];
  pastProjects : any[];
  accountBoolean: boolean;
  accountType: any;
  user: any;

  noCurrProjectBoolean: boolean;
  noPastProjectBoolean: boolean;
  code: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,	private tokenStorage : TokenStorageService, private institutionService: InstitutionService, private userService: UserService, private sessionService: SessionService) {
        this.accountType = this.tokenStorage.getAccountType();
        this.user = this.tokenStorage.getUser();
      console.log(this.accountType);
        if(this.accountType == "institution") {
          this.accountBoolean = true;
        } else if(this.accountType == "user") {
          this.accountBoolean = false;
        }
        console.log(this.accountBoolean);
      }

  ngOnInit() {
    this.initialise();
    // Dummy data to be replaced with actual data when the proj endpoints are created. Some attributes not in the dummy data, and some (eg role) are created here.
    /*this.currProjects = [
      {"id": "1", "title": "Project One", "desc": "This is a special project", "SDG": [1, 3], "status": "ongoing", "role": "Contributor"},
      {"id": "2", "title": "Project Two", "desc": "We are trying to solve problems", "SDG": [2, 6], "status": "ongoing", "role": "Admin"},
      {"id": "6", "title": "Project Six", "desc": "This SDG is especially important", "SDG": [7], "status": "ongoing", "role": "Contributor"},
    ];

    this.pastProjects = [
      {"id": "3", "title": "Project Three", "desc": "This SDG is especially important", "SDG": [1, 5], "status": "completed", "role": "Contributor"},
      {"id": "4", "title": "Project Four", "desc": "This is a special project", "SDG": [4], "status": "completed", "role": "Contributor"},
      {"id": "5", "title": "Project Five", "desc": "We are trying to solve problems", "SDG": [10], "status": "completed", "role": "Admin"}
    ];*/
  }

  ionViewDidEnter() {
    this.initialise();
  }

  initialise() {
    if(this.accountBoolean == true)
    {
        this.institutionService.getCurrentProjects(this.user.data.user.id).subscribe((res) => {
            this.currProjects = res.data.currProjects;
            if(this.currProjects.length > 0) {
              for(var i = 0; i < this.currProjects.length; i++) {
                this.currProjects[i].imgPath = this.sessionService.getRscPath() + this.currProjects[i].imgPath  +'?random+=' + Math.random();
              }
            } else {
                this.noCurrProjectBoolean = true;
            }
            
        }
        ),
        err => {
          console.log('********** Current-projects(institution).ts: ', err.error.msg);
        };

        this.institutionService.getPastProjects(this.user.data.user.id).subscribe((res) => {
        this.pastProjects = res.data.pastProjects
        console.log(this.pastProjects.length);
        if(this.pastProjects.length > 0) {
          for(var i = 0; i < this.pastProjects.length; i++) {
            this.pastProjects[i].imgPath = this.sessionService.getRscPath() + this.pastProjects[i].imgPath  +'?random+=' + Math.random();
          }
        } else {
            this.noPastProjectBoolean = true;
        }

      }),
        err => {
          console.log('********** Past-projects(institution).ts: ', err.error.msg);
        };

    } else if(this.accountBoolean == false) {
          this.userService.getCurrentProjects(this.user.data.user.id).subscribe((res) => {
          this.currProjects = res.data.currProjects

          if(this.currProjects.length > 0) {
            for(var i = 0; i < this.currProjects.length; i++) {
              this.currProjects[i].imgPath = this.sessionService.getRscPath() + this.currProjects[i].imgPath  +'?random+=' + Math.random();
            }
          } else {
              this.noCurrProjectBoolean = true;
          }
    }),
      err => {
        console.log('********** Current-projects(user).ts: ', err.error.msg);
      };

      this.userService.getPastProjects(this.user.data.user.id).subscribe((res) => {
            this.pastProjects = res.data.pastProjects

            if(this.pastProjects.length > 0) {
              for(var i = 0; i < this.pastProjects.length; i++) {
                this.pastProjects[i].imgPath = this.sessionService.getRscPath() + this.pastProjects[i].imgPath  +'?random+=' + Math.random();
              }
            } else {
                this.noPastProjectBoolean = true;
            }
      }),
      err => {
        console.log('********** Past-projects(user).ts: ', err.error.msg);
      };
    }
  }

  update(event, project) {
    this.router.navigate(["/update-project/" + project.id]);
  }

  async deleteProduct()
	{
		/* const alert = await this.alertController.create({
			header: 'Confirm Delete Project',
			message: 'Confirm delete Project?',
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
				this.projectService.deleteProduct(this.productId).subscribe(
					response => {
						this.resultSuccess = true;
						this.productToView = null;
					},
					error => {
						this.error = true;
						this.errorMessage = error;
					}
				);
			  }
			}
			]
		});

		await alert.present(); */
	}

}
