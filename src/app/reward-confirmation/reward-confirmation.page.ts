import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reward-confirmation',
  templateUrl: './reward-confirmation.page.html',
  styleUrls: ['./reward-confirmation.page.scss'],
})
export class RewardConfirmationPage implements OnInit {
  @Input("msg") msg
  @Input("code") code
  @Input("claimedAt") claimedAt
  @Input("endDate") endDate
  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.router.navigateByUrl("/tabs/marketplace")
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }
}
