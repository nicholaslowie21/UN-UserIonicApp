import { AuthService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PopoverController, ToastController } from '@ionic/angular';
import { TokenStorageService } from '../services/token-storage.service';
import { ProjectService } from '../services/project.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { InstitutionService } from '../services/institution.service';
import { UserService } from '../services/user.service';
import { MarketplaceService } from '../services/marketplace.service';
import { AnnouncementsPage } from '../announcements/announcements.page';
import { CommunicationService } from '../services/communication.service';
 
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
  pages: string;
  discoverList: any[];
  announcements: any;
  unread: number;
 
  constructor(private marketplaceService: MarketplaceService,
    private institutionService: InstitutionService, 
    private userService: UserService, 
    private router: Router, 
    private projectService: ProjectService, 
    private storage: Storage, 
    private toastController: ToastController, 
    private tokenStorage: TokenStorageService, 
    private sessionService: SessionService,
    private popoverController:PopoverController,
    private commService:CommunicationService) { 
    this.accountType = this.tokenStorage.getAccountType();
    this.currentUser = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
    this.pages = "feed";
  }
  ngOnInit() {
    this.tokenStorage.getUser();
    this.getNewsFeed();
    this.getDiscover();
    this.getAnnouncements();
  }

  ionViewDidEnter(){
    this.currentUser = this.tokenStorage.getUser();
    this.getNewsFeed();
    this.getDiscover();
    this.getAnnouncements();
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

  getAnnouncements() {
    console.log(this.tokenStorage.getAnnouncementLength() == undefined);
    /*if(this.tokenStorage.getAnnouncementLength() == undefined) {
      this.tokenStorage.saveAnnouncementLength(0)
    } */
    this.commService.viewAnnouncements().subscribe((res) => {
      this.announcements = res.data.announcements;
      if(this.announcements != undefined) {
        console.log(this.tokenStorage.getAnnouncementLength());
        this.unread = this.announcements.length - this.tokenStorage.getAnnouncementLength();
        console.log(this.unread);
        this.tokenStorage.saveAnnouncementLength(this.announcements.length)
      }
      
  }, (err) => {
    console.log("View Announcement Error: " + err.error.msg);
  })
  
  }

  getDiscover() {
    this.marketplaceService.discoverWeekly().subscribe((res) => {
      this.discoverList = res.data.discoverweekly;
      if(this.discoverList != undefined) {
        console.log(this.discoverList);
        for(var i = 0; i < this.discoverList.length; i ++) {
          this.discoverList[i].imgPath = this.sessionService.getRscPath() + this.discoverList[i].imgPath +'?random+=' + Math.random();
          console.log(this.discoverList[i].imgPath);
          this.discoverList[i].hostImg = this.sessionService.getRscPath() + this.discoverList[i].hostImg + '?random+=' + Math.random();
          var hostType = this.discoverList[i].hostType;

        }
      }
      
    },
    (err) => {
      console.log(err.error.msg);
    })
    console.log(this.discoverList);
  }

  /*doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.marketplaceService.discoverWeekly().subscribe((res) => {
        this.discoverList = res.data.discoverweekly;
        if(this.discoverList != undefined) {
          for(var i = 0; i < this.discoverList.length; i ++) {
            this.discoverList[i].imgPath = this.sessionService.getRscPath() + this.newsList[i].imgPath +'?random+=' + Math.random();
            this.discoverList[i].hostImg = this.sessionService.getRscPath() + this.newsList[i].hostImg + '?random+=' + Math.random();
            var hostType = this.newsList[i].hostType;
  
          }
        }
        
      },
      (err) => {
        console.log(err.error.msg);
      })

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);

    console.log(this.discoverList);
    
  }*/

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
 
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AnnouncementsPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
 
}