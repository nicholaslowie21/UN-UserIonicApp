import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { TokenStorageService } from '../services/token-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private tokenStorage:TokenStorageService, private toastCtrl:ToastController) { }
      username: string;
      password: string;
      credentialsForm: FormGroup;

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      res => {
        this.tokenStorage.saveToken(res.data.token);
        this.tokenStorage.saveUser(res);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.successToast();
        this.router.navigateByUrl("/tabs");
      },
      err => {
        this.failureToast(err);
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  async successToast() {
    const toast = this.toastCtrl.create({
      message: 'Login successful',
      duration: 3000,
      position: 'middle',
      cssClass: "toast-pass"
    });
    (await toast).present();
  }
 
  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Login Unsuccessful: ' + error,
      duration: 3000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
 
}