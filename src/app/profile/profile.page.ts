import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  currentUser: any;
  title = 'fileUpload';
  images;
  image;
  badges: any[];
  sdgs: any[];
  name: any;
  accountType: any;
  accountBoolean: boolean;
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router, private userService: UserService) { 
    
  }

  ngOnInit(): void {
   this.currentUser = this.tokenStorage.getUser();
   console.log(this.currentUser);
   
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else if(this.accountType == "user") {
      this.accountBoolean = false;
    }
    console.log(this.accountBoolean);
  }

  toRewards() {
    this.router.navigateByUrl("/rewards")
  }

  ionViewDidEnter() {
    this.currentUser = this.tokenStorage.getUser();
    console.log(this.currentUser);
    this.name = this.currentUser.data.user.name;
    this.image = this.currentUser.data.user.profilePic;
    this.sdgs = this.currentUser.data.user.SDGs;
    this.accountType = this.currentUser.data.accountType;
  }
  

}