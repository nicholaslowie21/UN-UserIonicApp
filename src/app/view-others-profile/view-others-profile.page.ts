import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service'
import { AuthService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';
import { InstitutionService } from '../services/institution.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { CreateReportPage } from '../report/create-report/create-report.page';
import { ViewProfileTargetsPage } from '../view-profile-targets/view-profile-targets.page';

@Component({
  selector: 'app-view-others-profile',
  templateUrl: './view-others-profile.page.html',
  styleUrls: ['./view-others-profile.page.scss'],
})
export class ViewOthersProfilePage implements OnInit {

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
  username: string;
  contributerType: string;
  gender: any;
  salutation: any;
  website: any;
  country: any;
  bio: any;
  skills: any;
  occupation: any;
  phone: any;
  address: any;
  id: any;
  viewInfo: {};
  originPage: string;
  profileFeed: any;
  reversedProfileFeed: any;
  page: any;
  modal: any;
  
  constructor(private auth: AuthService, 
    private http: HttpClient, 
    private tokenStorage: TokenStorageService, 
    private router: Router, 
    private userService: UserService, 
    private sessionService: SessionService, 
    private institutionService: InstitutionService, 
    private socialSharing: SocialSharing, 
    private actionSheet: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalController: ModalController) { 
    
  }

  ngOnInit(): void {
    this.page = 'feed'
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.accountType = this.activatedRoute.snapshot.paramMap.get('contributorType');
    this.originPage = "/view-project/" + this.tokenStorage.getProjectId();
    console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else if(this.accountType == "user") {
      this.accountBoolean = false;
    }
    console.log(this.accountBoolean);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      this.institutionService.viewInstitution(this.username).subscribe((res)=> {
        this.currentUser = res.data.targetInstitution;
        this.initialiseInstitution();
      },
      (err) => {
        console.log("Error retrieving Institution: " + err.error.msg);
      })
    } else if(this.accountType == "user") {
      console.log("here");
      this.accountBoolean = false;
      this.userService.viewUser(this.username).subscribe((res)=> {
        this.currentUser = res.data.targetUser;
        this.initialiseUser();
      },
      (err) => {
        console.log("Error retrieving User: " + err.error.msg);
      })
    }
}

  initialiseUser() {
    this.viewInfo = {
      "username": this.username,
      "id": this.id,
      "accountType": this.accountType
    }
    this.tokenStorage.saveViewId(this.viewInfo);
    this.image = '';
    this.name = this.currentUser.name;
    this.gender = this.currentUser.gender;
    this.salutation = this.currentUser.salutation;
    this.website = this.currentUser.website;
    this.country = this.currentUser.country;
    this.bio = this.currentUser.bio;
    this.occupation = this.currentUser.occupation;
    this.skills = this.currentUser.skills;
    this.id = this.currentUser.id;
    this.image = this.sessionService.getRscPath() + this.currentUser.ionicImg +'?random+=' + Math.random();
    if(this.currentUser.occupation == "") {
      this.occupation = "-";
    }
    if(this.currentUser.skills == "") {
      this.skills = "-";
    }
    if(this.currentUser.bio == "") {
      this.bio = "-";
    }
    this.sdgs = this.currentUser.SDGs;

    if(this.currentUser.isVerified == "true") {
      this.isVerified = true;
    }

      this.userService.getBadges(this.currentUser.id).subscribe((res) => {
        this.badges = res.data.badges
        for(var i = 0; i < this.badges.length; i++) {
          this.badges[i].imgPath = this.sessionService.getRscPath() + this.badges[i].imgPath +'?random+=' + Math.random();
        }
      }),
      err => {
        console.log('********** Badges(user).ts: ', err.error.msg);
      };

      this.userService.getUserProfileFeed(this.currentUser.id).subscribe((res) => {
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

  initialiseInstitution() {
    this.viewInfo = {
      "username": this.username,
      "id": this.id,
      "accountType": this.accountType
    }
    this.tokenStorage.saveViewId(this.viewInfo);
    this.image = '';
    this.name = this.currentUser.name;
    this.phone = this.currentUser.phone;
    this.website = this.currentUser.website;
    this.country = this.currentUser.country;
    this.bio = this.currentUser.bio;
    this.address = this.currentUser.address;
    this.id = this.currentUser.id;
    this.image = this.sessionService.getRscPath() + this.currentUser.ionicImg +'?random+=' + Math.random();
    if(this.currentUser.occupation == "") {
      this.currentUser.occupation = "-";
    }
    if(this.currentUser.skills == "") {
      this.currentUser.skills = "-";
    }
    if(this.currentUser.bio == "") {
      this.currentUser.bio = "-";
    }
    this.sdgs = this.currentUser.SDGs;

    if(this.currentUser.isVerified == "true") {
      this.isVerified = true;
    }
        this.institutionService.getBadges(this.currentUser.id).subscribe((res) => {
          this.badges = res.data.badges
          for(var i = 0; i < this.badges.length; i++) {
              this.badges[i].imgPath = this.sessionService.getRscPath() + this.badges[i].imgPath +'?random+=' + Math.random();
          }
        }),
        err => {
          console.log('********** Badges(institution).ts: ', err.error.msg);
        };

        this.institutionService.getInstitutionProfileFeed(this.currentUser.id).subscribe((res) => {
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

  }

  parseDate(d: String) {		
    let idx = d.indexOf("T");
    let day = d.substring(0,idx);
    let t = d.substring(idx + 1, idx + 6)
    return day + " "  + t;
  }

  ionViewDidEnter() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.accountType = this.activatedRoute.snapshot.paramMap.get('contributorType');
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      this.institutionService.viewInstitution(this.username).subscribe((res)=> {
        this.initialiseInstitution();
      },
      (err) => {
        console.log("Error retrieving Institution: " + err.error.msg);
      })
      
    } else if(this.accountType == "user") {
      this.accountBoolean = false;
      this.userService.viewUser(this.username).subscribe((res)=> {
        this.currentUser = res.data.targetUser;
        this.initialiseUser();
      },
      (err) => {
        console.log("Error retrieving User: " + err.error.msg);
      })
    }

    
    
  }

  getAffiliates($event) {
    this.router.navigate(['/affiliation-management/' + this.id]);
  }

  getProjects($event) {
    this.router.navigate(['/view-others-projects/' + this.id]);
  }

  getResources($event) {
    this.router.navigate(['/view-others-resources/' + this.id]);
  }

  /*shareviaWhatsapp(){
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

  /*shareviaInstagram(){
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
    
  }*/

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

  /*async presentActionSheet() {
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
  }*/

  back() {
    this.navCtrl.pop();
    //this.router.navigate([this.originPage]);
    this.tokenStorage.saveViewId(this.tokenStorage.getUser().data.user.id);
 }

 async report() {
  this.modal = await this.modalController.create({
    component: CreateReportPage,
    componentProps: {"targetId": this.id, "type": this.accountType, "name": this.name}
  });
  return await this.modal.present();
}

openChat() {
  this.router.navigate(["/chatroom/" + this.id + "/" + this.accountType + "/" +this.name + "/normal"])
}

requestTestimonial() {
  this.router.navigate(["/request-testimonial/" + this.id + "/" + this.accountType + "/" +this.name])
}

writeTestimonial() {
  this.router.navigate(["/testimonial-others/" + this.id + "/" + this.accountType + "/" +this.name])
}

getTestimonials($event) {
  this.router.navigate(["/my-testimonials/" + this.id + "/" + this.accountType])
}

viewTargets($event) {
  this.router.navigate(['/view-profile-targets/' + this.currentUser.id + "/" + this.accountType + "/" + this.currentUser.name]);
}

// async presentModal(resource) {
//   this.modal = await this.modalController.create({
//     component: ViewProfileTargetsPage,
//     componentProps: {"accountId": this.currentUser.id, "accountType": this.accountType, "accountName": this.currentUser.name}
    
//   });
//   this.modal.onWillDismiss().then((data) => {
// });
//   return await this.modal.present();
// }

}
