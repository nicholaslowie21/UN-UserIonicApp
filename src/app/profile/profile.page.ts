import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service'
import { AuthService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';
import { InstitutionService } from '../services/institution.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { ViewProfileTargetsPage } from '../view-profile-targets/view-profile-targets.page';

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
  profileFeed: any;
  reversedProfileFeed: any[];
  page: any;
  modal: any;
  user: any;
  noBadgeBoolean: boolean;
  
  constructor(private auth: AuthService, 
    private http: HttpClient, 
    private tokenStorage: TokenStorageService, 
    private router: Router, 
    private userService: UserService, 
    private sessionService: SessionService, 
    private institutionService: InstitutionService, 
    private socialSharing: SocialSharing, 
    private actionSheet: ActionSheetController,
    private modalController:ModalController) { 
    
  }

  ngOnInit(): void {
    this.page="feed";
   this.currentUser = this.tokenStorage.getUser();
   
   this.accountType = this.tokenStorage.getAccountType();
   
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      if(this.currentUser.data.user.isVerified == true) {
        this.isVerified = true;
      }
    } else if(this.accountType == "user") {
      console.log(typeof this.currentUser.data.user.isVerified);
      if(this.currentUser.data.user.isVerified == "true") {
        this.isVerified = true;
      }
      this.accountBoolean = false;
    }
    console.log(this.accountBoolean);
    this.initialise();
    console.log("line 70 " + this.user);
    this.noBadgeBoolean = true;

    if(this.accountBoolean == true)
    {   
        this.institutionService.getBadges({"institutionId": this.currentUser.data.user.id, "accountType": this.accountType}).subscribe((res) => {
          this.badges = res.data.badges
          if(this.badges.length == 0) {
            this.noBadgeBoolean = true;
          } else {
            for(var i = 0; i < this.badges.length; i++) {
                this.badges[i].imgPath = this.sessionService.getRscPath() + this.badges[i].imgPath +'?random+=' + Math.random();
            }
            this.noBadgeBoolean = false;
          }
          console.log(this.noBadgeBoolean);
        }),
        err => {
          console.log('********** Badges(institution).ts: ', err.error.msg);
        };

        this.institutionService.getInstitutionProfileFeed(this.currentUser.data.user.id).subscribe((res) => {
          this.profileFeed = res.data.feeds;
          this.reversedProfileFeed = [];
          var end = this.profileFeed.length-1
          for(var x = 0; x < this.profileFeed.length; x++) {
            var modifiedCreatedAt = this.profileFeed[x].createdAt
            this.profileFeed[x].createdAt = this.parseDate(modifiedCreatedAt);
            this.reversedProfileFeed[x] = this.profileFeed[end]
            end -= 1;
          }
        }, (err) => {
          console.log('********** Profile Feed error(Institution).ts: ', err.error.msg);
        })

    } else if(this.accountBoolean == false) {

      this.userService.getBadges({"userId": this.currentUser.data.user.id, "accountType": this.accountType}).subscribe((res) => {
        this.badges = res.data.badges
        if(this.badges.length == 0) {
          this.noBadgeBoolean = true;
        } else {
          for(var i = 0; i < this.badges.length; i++) {
            this.badges[i].imgPath = this.sessionService.getRscPath() + this.badges[i].imgPath +'?random+=' + Math.random();
          }
          this.noBadgeBoolean = false;
        }
        console.log(this.noBadgeBoolean);
      }),
      err => {
        console.log('********** Badges(user).ts: ', err.error.msg);
      };

      this.userService.getUserProfileFeed(this.currentUser.data.user.id).subscribe((res) => {
        this.profileFeed = res.data.feeds;
        this.reversedProfileFeed = [];
        var end = this.profileFeed.length-1
        for(var x = 0; x < this.profileFeed.length; x++) {
          var modifiedCreatedAt = this.profileFeed[x].createdAt
          this.profileFeed[x].createdAt = this.parseDate(modifiedCreatedAt);
          this.reversedProfileFeed[x] = this.profileFeed[end];
          end -= 1;
          
        }
      }, (err) => {
        console.log('********** Profile Feed error(user).ts: ', err.error.msg);
      })
    }

    
}

parseDate(d: String) {		
  let idx = d.indexOf("T");
  let day = d.substring(0,idx);
  let t = d.substring(idx + 1, idx + 6)
  return day + " "  + t;
}

  toRewards() {
    this.router.navigateByUrl("/rewards")
  }

  ionViewDidEnter() {
    this.initialise();
    this.image = '';
    console.log(this.tokenStorage.getUser());
    this.currentUser = this.tokenStorage.getUser();
    this.name = this.currentUser.data.user.name;
    this.image = this.sessionService.getRscPath() + this.tokenStorage.getUser().data.user.ionicImg +'?random+=' + Math.random();
    this.initialise();
    if(this.user.occupation == "") {
      this.user.occupation = "-";
    }
    if(this.user.skills == "") {
      this.user.skills = "-";
    }
    if(this.user.bio == "") {
      this.user.bio = "-";
    }
    this.sdgs = this.user.SDGs;
    this.accountType = this.currentUser.data.accountType;

    if(this.accountType == "institution") {
      this.institutionService.getInstitutionProfileFeed(this.currentUser.data.user.id).subscribe((res) => {
        this.profileFeed = res.data.feeds;
        this.reversedProfileFeed = [];
          var end = this.profileFeed.length-1
          for(var x = 0; x < this.profileFeed.length; x++) {
            var modifiedCreatedAt = this.profileFeed[x].createdAt
            this.profileFeed[x].createdAt = this.parseDate(modifiedCreatedAt);
            this.reversedProfileFeed[x] = this.profileFeed[end]
            end -= 1;
          }
      }, (err) => {
        console.log('********** Profile Feed error(Institution).ts: ', err.error.msg);
      })
    } else if(this.accountType == "user") {
      this.userService.getUserProfileFeed(this.currentUser.data.user.id).subscribe((res) => {
        this.profileFeed = res.data.feeds;
        this.reversedProfileFeed = [];
        var end = this.profileFeed.length-1
        for(var x = 0; x < this.profileFeed.length; x++) {
          var modifiedCreatedAt = this.profileFeed[x].createdAt
          this.profileFeed[x].createdAt = this.parseDate(modifiedCreatedAt);
          this.reversedProfileFeed[x] = this.profileFeed[end];
          end -= 1;
          
        }
        console.log(this.reversedProfileFeed);
      }, (err) => {
        console.log('********** Profile Feed error(user).ts: ', err.error.msg);
      })
    }
    
    
  }

  initialise() {
    if(this.accountType == "user") {
      console.log("iran");
      this.user = this.userService.viewUserById(this.currentUser.data.user.id).subscribe((res) => {
        this.user = res.data.targetUser;
        console.log(this.user);
      }, (err) => {
        console.log("View User by Id err: " + err.error.msg)
      })
    } else if(this.accountType == "institution") {
      this.user = this.institutionService.viewInstitutionById(this.currentUser.data.user.id).subscribe((res) => {
        this.user = res.data.targetInstitution
      }, (err) => {
        console.log("View User by Id err: " + err.error.msg)
      })
    }
     console.log(this.user);
  }
  
  logout() {
    this.auth.logout();
    this.tokenStorage.saveViewId(undefined);
    this.router.navigateByUrl("/login");
  }

  getAffiliates($event) {
    this.router.navigate(['/affiliation-management/' + this.currentUser.data.user.id]);
  }

  getProjects($event) {
    this.router.navigate(['/my-projects/' + this.currentUser.data.user.id]);
  }

  getTestimonials($event) {
    this.router.navigate(["/my-testimonials/" + this.currentUser.data.user.id + "/" + this.accountType])
  }

  viewTargets($event) {
    this.router.navigate(['/view-profile-targets/' + this.currentUser.data.user.id + "/" + this.accountType + "/" + this.currentUser.data.user.name]);
  }

  // async presentModal(resource) {
  //   this.modal = await this.modalController.create({
  //     component: ViewProfileTargetsPage,
  //     componentProps: {"accountId": this.currentUser.data.user.id, "accountType": this.accountType, "accountName": this.currentUser.data.user.name}
      
  //   });
  //   this.modal.onWillDismiss().then((data) => {
  // });
  //   return await this.modal.present();
  // }

  getResources($event) {
    this.router.navigate(['/my-resources/' + this.currentUser.data.user.id]);
  }

  shareviaWhatsapp(){
    if(this.accountBoolean == false) {
      console.log("userShare");
      this.userService.generateShare().subscribe((res) =>{
        this.imageForSharing = res.data.theLink
        this.socialSharing.shareViaWhatsApp("Hi! This is my profile in KoCoSD.",this.imageForSharing)
      .then((success) =>{
          alert("Successfully shared your profile!");
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
        this.socialSharing.shareViaWhatsApp("Hi! This is our profile in KoCoSD.",this.imageForSharing)
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
        this.socialSharing.shareViaInstagram("Hi! This is my profile in KoCoSD",this.imageForSharing)
      .then((success) =>{
          alert("Successfully shared your profile!");
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
        this.socialSharing.shareViaInstagram("Hi! This is our profile in KoCoSD.",this.imageForSharing)
      .then((success) =>{
          alert("Successfully shared your profile");
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
  
  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

}