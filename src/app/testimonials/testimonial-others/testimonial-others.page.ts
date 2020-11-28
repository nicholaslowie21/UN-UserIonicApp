import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-testimonial-others',
  templateUrl: './testimonial-others.page.html',
  styleUrls: ['./testimonial-others.page.scss'],
})
export class TestimonialOthersPage implements OnInit {
  id: string;
  type: string;
  name: string;
  projectData: { accountId: any; accountType: any; };
  commonProjectsList: any;
  words: any;
  testimonialData: {};
  requestData: { accountId: string; accountType: string; projectId: any; };
  p: any;

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

  writeTestimonial() {
    this.testimonialData = {
      "accountId": this.id,
      "accountType": this.type,
      "projectId": this.p,
      "desc": this.words
    }
    this.testimonialService.writeTestimonialForOthers(this.testimonialData).subscribe((res) => {
      this.successToast();
    }, (err) => {
      this.failureToast(err.error.msg);
      console.log("Write Testimonial for others error: " + err.error.msg)
    })

  }

  request() {
    this.requestData ={
      "accountId": this.id,
      "accountType": this.type,
      "projectId": this.p
    }
    this.testimonialService.requestTestimonial(this.requestData).subscribe((res) => {
      this.reqSuccessToast();
    }, (err) => {
      this.reqFailureToast(err.error.msg);
      console.log("Request Testimonial Error: " + err.error.msg)
    })
  }

  async reqSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Testimonial requested successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async reqFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Testimonial requested Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Testimonial written successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Testimonial written Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

}
