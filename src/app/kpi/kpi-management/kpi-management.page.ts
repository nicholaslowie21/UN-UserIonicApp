import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-kpi-management',
  templateUrl: './kpi-management.page.html',
  styleUrls: ['./kpi-management.page.scss'],
})
export class KpiManagementPage implements OnInit {
  kpis: any;
  id: string;
  resultSuccess: boolean;
  error: boolean;
  errorMessage: any;

  constructor(private toastCtrl: ToastController, private alertController:AlertController, private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.projectService.getKpi(this.id).subscribe((res) => {
        this.kpis = res.data.kpis;
    },
    err => {
      console.log("**********Retrieve KPI.ts error")
    })
  }

  back() {
    this.router.navigate(["/view-project/" + this.id]);
  }

  create(ev) {
    this.router.navigate(["/create-kpi/" + this.id])
  }

  ionViewDidEnter() {
    this.refresh();
  }

  update(event, kpi) {
    this.router.navigate(["/update-kpi/" + kpi.id]);
  }

  refresh() {
    this.projectService.getKpi(this.id).subscribe((res) => {
      this.kpis = res.data.kpis;
  },
  err => {
    console.log("**********Retrieve KPI.ts error")
  })
  }


  async delete(event, kpi)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to delete KPI',
			message: 'Confirm delete KPI?',
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
				this.projectService.deleteKpi(kpi.id).subscribe(
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
