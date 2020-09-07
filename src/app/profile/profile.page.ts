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
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router, private userService: UserService) { 
    
  }

  ngOnInit(): void {
   this.currentUser = this.tokenStorage.getUser();
   this.image = this.currentUser.data.user.profilePic;
  }

  toRewards() {
    this.router.navigateByUrl("/rewards")
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  /*onSubmit(){
    const formData = new FormData();
    formData.append('profilePic', this.images);

    this.http.post<any>('https://localhost:8080/api/user/uploadProfilePicture', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }*/

  onSubmit(){
    const formData = new FormData();
    formData.append('profilePic', this.images);

    this.userService.uploadProfilePicture(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}