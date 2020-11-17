import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-write-testimonial',
  templateUrl: './write-testimonial.page.html',
  styleUrls: ['./write-testimonial.page.scss'],
})
export class WriteTestimonialPage implements OnInit {
  @Input("testimonial") testimonial;
  acceptData: { testimonialId: any; status: string; desc: string};
  words: string;
  constructor(private testimonialService: TestimonialService,
    private toastCtrl:ToastController,
    private popoverCtrl: PopoverController) { }

  ngOnInit() {
    console.log(this.testimonial);
  }

  writeTestimonial() {
    console.log(this.words);
    this.acceptData = {
      "testimonialId": this.testimonial.id,
      "status": "pending",
      "desc": this.words
    }
    this.testimonialService.updateMyOutgoingTestimonialStatus(this.acceptData).subscribe((res)=> {
      
      this.acceptWriteSuccessToast();
      this.dismiss();
    }, (err) => {
      this.acceptWriteFailureToast(err.error.msg);
    })
  }

  dismiss() {
    this.popoverCtrl.dismiss({
      'dismissed': true
    });
  }

  async acceptWriteSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Testimonial written successfully! Testimonial will be sent!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async acceptWriteFailureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Testimonial written Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
