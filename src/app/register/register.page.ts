import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    form: FormGroup;
    name: string;
    username: string; 
    email: string;
    password: string;
    bio: string;
    occupation: string;
    country: string;
    message: string;

  resultSuccess: boolean;
  resultError: boolean;
  constructor(private  authService:  AuthService, private  router:  Router, private toastCtrl: ToastController) { 
    this.resultSuccess = false;
		this.resultError = false;

  }
          

  ngOnInit() {
  }

  register(registerForm:NgForm) {
    console.log(1);
    this.authService.register(this.name, this.username, this.email, this.password, this.occupation, this.country).subscribe((res) => {
      console.log(2);
      this.resultSuccess = true;
      this.resultError = false;
      registerForm.reset();
      this.message = "New User created successfully"; 
      this.successToast();
      this.router.navigateByUrl('tabs');
    },
    error => {
      this.resultSuccess = false;
      this.resultError = true;
      this.failureToast(error);
      console.log('********** RegisterNewUserPage.ts: ', error);
    });
  }

  back() {
    this.router.navigateByUrl("/login");
  }


  async successToast() {
    const toast = this.toastCtrl.create({
      message: 'Registration successful!',
      buttons: ['back()'],
      duration: 3000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Registration Unsuccessful: ' + error,
      duration: 3000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }


}
