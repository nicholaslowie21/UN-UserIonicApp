import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-request-verification',
  templateUrl: './request-verification.page.html',
  styleUrls: ['./request-verification.page.scss'],
})
export class RequestVerificationPage implements OnInit {
  

  constructor(private alertCtrl:AlertController, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl("/accountsettings")
  }

  verify() {
    this.authService.requestVerification().subscribe((res) => {
      console.log(res.msg);
        this.showAlert(res.msg);
    },
    err => {
        
        console.log('********** RequestUserVerification.ts: ', err.error.msg);
    })
  }

  async showAlert(msg) {  
    const alert = await this.alertCtrl.create({  
      header: 'Success',  
      subHeader: "You will be notified once an admin has verified your account", 
      message: msg,  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  }
}
