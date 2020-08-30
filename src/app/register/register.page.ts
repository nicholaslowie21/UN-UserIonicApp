import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }
          form: FormGroup;
          name: string;
          username: string; 
          email: string;
          password: string;
          bio: string;
          occupation: string;
          country: string;

  ngOnInit() {
  }

  register(registerForm:NgForm) {
    console.log(1);
    this.authService.register(this.name, this.username, this.email, this.password, this.bio, this.occupation, this.country).subscribe((res) => {
      console.log(2);
      registerForm.reset();
      this.router.navigateByUrl('tabs');
    },
    error => {
      console.log('********** RegisterNewUserPage.ts: ', error);
    });
  }

  back() {
    this.router.navigateByUrl("/login");
  }


}
