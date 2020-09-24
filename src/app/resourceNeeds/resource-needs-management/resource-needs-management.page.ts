import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-resource-needs-management',
  templateUrl: './resource-needs-management.page.html',
  styleUrls: ['./resource-needs-management.page.scss'],
})
export class ResourceNeedsManagementPage implements OnInit {
  id: string;
  resourceNeeds: any[];
  resultSuccess: boolean;
  error: boolean;
  errorMessage: any;

  constructor(private toastCtrl: ToastController, private alertController: AlertController, private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService, ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectService.getResourceNeeds(this.id).subscribe((res) => {
        console.log(res);
        this.resourceNeeds = res.data.resourceneeds;
    },
    err => {
      console.log("**********Retrieve ResourceNeedsList.ts error")
    })
    console.log(this.resourceNeeds);
  }

  back() {
    this.router.navigate(["/view-project/" + this.id]);
  }

  create(ev) {
    this.router.navigate(["/create-resource-need/" + this.id])
  }

  ionViewDidEnter() {
    this.refresh();
  }

  update(event, r) {
    this.router.navigate(["/update-resource-needs/" + r.id]);
  }

  refresh() {
    this.projectService.getResourceNeeds(this.id).subscribe((res) => {
      this.resourceNeeds = res.data.resourceneeds;
  },
  err => {
    console.log("**********Retrieve ResourceNeeds.ts error")
  })
  }


  async delete(event, need)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to delete resource need',
			message: 'Confirm delete Resource Need?',
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
				this.projectService.deleteResourceNeed(need.id).subscribe(
					response => {
            this.resultSuccess = true;
            this.successToast();
            this.router.navigate(["/view-project/" + this.id]);
					},
					error => {
            this.failureToast(error);
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
