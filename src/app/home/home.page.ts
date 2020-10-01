import { AuthService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { TokenStorageService } from '../services/token-storage.service';
import { ProjectService } from '../services/project.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { InstitutionService } from '../services/institution.service';
import { UserService } from '../services/user.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  data = '';
  accountType: any;
  accountBoolean: boolean;
  newsList: any;
  currentUser: any;
  newsFeedList: any[];
 
  constructor(private institutionService: InstitutionService, private userService: UserService, private router: Router, private projectService: ProjectService, private storage: Storage, private toastController: ToastController, private tokenStorage: TokenStorageService, private sessionService: SessionService) { 
    this.accountType = this.tokenStorage.getAccountType();
    this.currentUser = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
  }
  ngOnInit() {
    this.tokenStorage.getUser();
    this.getNewsFeed();
  }

  ionViewDidEnter(){
    this.currentUser = this.tokenStorage.getUser();
    this.getNewsFeed();
  }
 
  getNewsFeed() {
    this.projectService.getNewsFeed().subscribe((res) => {
      this.newsList = res.data.newsfeeds;
      if(this.newsList != undefined) {
        this.newsFeedList =[];
        console.log(this.newsList.length)
        for(var i = 0; i < this.newsList.length; i ++) {
          this.newsList[i].imgPath = this.sessionService.getRscPath() + this.newsList[i].imgPath +'?random+=' + Math.random();
          this.newsList[i].ionicImg = this.sessionService.getRscPath() + this.newsList[i].ionicImg + '?random+=' + Math.random();
          var hostType = this.newsList[i].hostType;
          console.log(hostType);
          var x = this.newsList[i];

        }
      }
      
    },
    (err) => {
      console.log(err.error.msg);
    })

  }

  viewFounderProfile(ev, h) {
    var username = "";
    if(h.id == this.currentUser.data.user.id) {
      this.router.navigateByUrl("/tabs/profile");
    } else {
      
      if(h.hostType == "institution") {
          this.institutionService.viewInstitutionById(h.host).subscribe((res) => {
            username = res.data.targetInstitution.username
            this.router.navigate(['/view-others-profile/' + username + "/" + h.hostType ])
          }, (err) => {
            console.log("View Founder Profile error: " + err.error.msg);
          })
      } else if(h.hostType == "user") {
        this.userService.viewUserById(h.host).subscribe((res) => {
          username = res.data.targetUser.username
          this.router.navigate(['/view-others-profile/' + username + "/" + h.hostType ])
        }, (err) => {
          console.log("View Founder Profile error: " + err.error.msg);
        })
      }
      
    }
  }

  viewProject(ev, p) {
    this.router.navigate(['/view-project/' + p.id]);
  }
 
  
 
}