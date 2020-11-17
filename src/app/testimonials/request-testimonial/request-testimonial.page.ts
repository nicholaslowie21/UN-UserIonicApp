import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-request-testimonial',
  templateUrl: './request-testimonial.page.html',
  styleUrls: ['./request-testimonial.page.scss'],
})
export class RequestTestimonialPage implements OnInit {
  id: string;
  type: string;
  name: string;
  projectData: { accountId: string; accountType: string; };
  commonProjectsList: any;
  p: any;
  requestData: { accountId: string; accountType: string; projectId: any; };

  constructor(private activatedRoute: ActivatedRoute, 
    private testimonialService: TestimonialService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.projectData = {
        "accountId": this.id,
        "accountType": this.type
    }

    this.testimonialService.getCommonProjects(this.projectData).subscribe((res) => {
      this.commonProjectsList = res.data.theProjects
    }, (err) => {
      console.log("Common Projects retrieval error: " + err.error.msg)
    })
  }

  request() {
    this.requestData ={
      "accountId": this.id,
      "accountType": this.type,
      "projectId": this.p
    }
    this.testimonialService.requestTestimonial(this.requestData).subscribe((res) => {
      this.successToast();
    }, (err) => {
      this.failureToast(err.error.msg);
      console.log("Request Testimonial Error: " + err.error.msg)
    })
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Request was successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Request was unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

}
