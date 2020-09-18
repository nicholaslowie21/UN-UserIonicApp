import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service'
import { AuthService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';
import { InstitutionService } from '../services/institution.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  currentUser: any;
  title = 'fileUpload';
  images;
  image: any;
  badges: any[];
  sdgs: any[];
  name: any;
  accountType: any;
  accountBoolean: boolean;
  imageForSharing: any;
  isVerified: boolean;
  
  constructor(private auth: AuthService, 
    private http: HttpClient, 
    private tokenStorage: TokenStorageService, 
    private router: Router, 
    private userService: UserService, 
    private sessionService: SessionService, 
    private institutionService: InstitutionService, 
    private socialSharing: SocialSharing, 
    private actionSheet: ActionSheetController) { 
    
  }

  ngOnInit(): void {
   this.currentUser = this.tokenStorage.getUser();
   
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else if(this.accountType == "user") {
      this.accountBoolean = false;
    }
    console.log(this.accountBoolean);
    if(this.currentUser.data.user.isVerified == "true") {
      this.isVerified = true;
    }

    if(this.accountBoolean == true)
    {
        this.institutionService.getBadges(this.currentUser.data.user.id).subscribe((res) => 
        this.badges = res.data.badges)
        err => {
          console.log('********** Badges(institution).ts: ', err.error.msg);
        };

    } else if(this.accountBoolean == false) {

      this.userService.getBadges(this.currentUser.data.user.id).subscribe((res) =>
      this.badges = res.data.badges)
      err => {
        console.log('********** Badges(user).ts: ', err.error.msg);
      };
    }
}

  toRewards() {
    this.router.navigateByUrl("/rewards")
  }

  ionViewDidEnter() {
    this.image = '';
    console.log(this.tokenStorage.getUser());
    this.currentUser = this.tokenStorage.getUser();
    console.log(this.tokenStorage.getUser().data.user.profilePic);
    this.name = this.currentUser.data.user.name;
    this.image = this.sessionService.getRscPath() + this.tokenStorage.getUser().data.user.ionicImg +'?random+=' + Math.random();
    if(this.currentUser.data.user.occupation == "") {
      this.currentUser.data.user.occupation = "-";
    }
    if(this.currentUser.data.user.skills == "") {
      this.currentUser.data.user.skills = "-";
    }
    if(this.currentUser.data.user.bio == "") {
      this.currentUser.data.user.bio = "-";
    }
    this.sdgs = this.currentUser.data.user.SDGs;
    this.accountType = this.currentUser.data.accountType;
  }
  
  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  shareviaWhatsapp(){
    if(this.accountBoolean == false) {
      console.log("userShare");
      this.userService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaWhatsApp("msg",this.imageForSharing)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
      })
    err => {
      console.log('********** ShareImage.ts: ', err.error.msg);
    };
    } else if(this.accountBoolean == true ) {
      console.log("InstitutionShare");
      this.institutionService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaWhatsApp("msg",this.imageForSharing)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
      })
    err => {
      console.log('********** ShareImage.ts: ', err.error.msg);
    };
    }
    
  }

  /*shareviaFacebook(){
    if(this.accountBoolean == false) {
      console.log("userShare");
      this.userService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaFacebook("msg",this.imageForSharing)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
      })
    err => {
      console.log('********** ShareImage.ts: ', err.error.msg);
    };
    } else if(this.accountBoolean == true ) {
      console.log("InstitutionShare");
      this.institutionService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaFacebook("msg",this.imageForSharing)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
      })
    err => {
      console.log('********** ShareImage.ts: ', err.error.msg);
    };
    }
    
  }*/

  shareviaInstagram(){
    if(this.accountBoolean == false) {
      console.log("userShare");
      this.userService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaInstagram("msg",this.imageForSharing)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
      })
    err => {
      console.log('********** ShareImage.ts: ', err.error.msg);
    };
    } else if(this.accountBoolean == true ) {
      console.log("InstitutionShare");
      this.institutionService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaInstagram("msg",this.imageForSharing)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
      })
    err => {
      console.log('********** ShareImage.ts: ', err.error.msg);
    };
    }
    
  }

  /*shareviaTwitter(){
    if(this.accountBoolean == false) {
      console.log("userShare");
      this.userService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaTwitter("msg",this.imageForSharing)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
      })
    err => {
      console.log('********** ShareImage.ts: ', err.error.msg);
    };
    } else if(this.accountBoolean == true ) {
      console.log("InstitutionShare");
      this.institutionService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaTwitter("msg",this.imageForSharing)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
      })
    err => {
      console.log('********** ShareImage.ts: ', err.error.msg);
    };
    }
    
  }*/

  async presentActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'Share',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Whatsapp',
        role: 'destructive',
        icon: 'logo-whatsapp',
        handler: () => {
          this.shareviaWhatsapp();
          console.log('Whatsapp clicked');
        }
      }, {
        text: 'Instagram',
        icon: 'logo-instagram',
        handler: () => {
          this.shareviaInstagram();
          console.log('Instagram clicked');
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}