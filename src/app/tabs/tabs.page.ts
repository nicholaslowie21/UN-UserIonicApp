import { Component } from '@angular/core';
import { IonTabs } from '@ionic/angular'
import { interval } from 'rxjs';
import { CommunicationService } from '../services/communication.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private activeTab?: HTMLElement;
  gotNotifs: boolean = false;
  source: any;
  subscribe: any;
  announcements: any;
  tempLength: string;
  gotNewAnnouncement: boolean = false;
  chatrooms: any;
  currentUser: any;
  accountType: any;
  accountBoolean: boolean;
  isVerified: boolean;
  chatNotRead: boolean;
  constructor(private commService: CommunicationService, private tokenStorage: TokenStorageService) {
    
    this.currentUser = this.tokenStorage.getUser();
   
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      if(this.currentUser.data.user.isVerified == true) {
        this.isVerified = true;
      }
    } else if(this.accountType == "user") {
      if(this.currentUser.data.user.isVerified == "true") {
        this.isVerified = true;
      }
      this.accountBoolean = false;
    }
    console.log(this.accountBoolean);

    this.source = interval(3000);
    this.subscribe = this.source.subscribe(() => {
      this.getAnnouncements();
      this.getChats();
      var newLength = this.announcements.length;
      console.log("tempLength" + this.tempLength);
      console.log("newLength" + newLength)
      if(this.announcements != undefined && newLength > this.tempLength) {
        this.gotNewAnnouncement = true;
        this.tempLength = newLength;
      } else {
        this.tempLength = newLength;
      }
      console.log("timer is running")
    }
     );
  }

  ngOnInit() {
    this.commService.gotNewNotifs().subscribe((res) => {
      this.gotNotifs = res.data.gotNew;
    }, (err) => {
      console.log("View Notifications Error: " + err.error.msg);
    })

    this.getAnnouncements();
  }


  getAnnouncements() {
    this.commService.viewAnnouncements().subscribe((res) => {
      this.announcements = res.data.announcements;
  }, (err) => {
    console.log("View Announcement Error: " + err.error.msg);
  })
  }

  getChats() {
    this.commService.getUserChatRooms().subscribe((res) => {
      this.chatrooms = res.data.chatRooms;
      // this.initializeChats();
      if(this.chatrooms != undefined) {
        for(var i = 0; i < this.chatrooms.length; i ++) {
            if(this.chatrooms[i].user1username == this.currentUser.data.user.username) {
              if(this.chatrooms[i].user1read == false) {
                this.chatNotRead = true;
                break;
              } else {
                continue;
              }
            } else if(this.chatrooms[i].user2username == this.currentUser.data.user.username) {
              if(this.chatrooms[i].user2read == false) {
                this.chatNotRead = true;
                break;
              } else {
                continue;
              }
            }
        }
      }
    }, (err) => {
      console.log("****************Retrieval of Chatrooms error: " + err.error.msg)
    })

    this.commService.getAdminChatRooms().subscribe((res) => {
      this.chatrooms = res.data.chatRooms;
      // this.initializeChats();
      if(this.chatrooms != undefined) {
        for(var i = 0; i < this.chatrooms.length; i ++) {
          if(this.chatrooms[i].user1username == this.currentUser.data.user.username) {
            if(this.chatrooms[i].user1read == false) {
              this.chatNotRead = true;
              break;
            } else {
              continue;
            }
          } else if(this.chatrooms[i].user2username == this.currentUser.data.user.username) {
            if(this.chatrooms[i].user2read == false) {
              this.chatNotRead = true;
              break;
            }  else {
              continue;
            }
          }
      }
      }
    }, (err) => {
      console.log("****************Retrieval of Chatrooms error: " + err.error.msg)
    })
  }
  tabChange(tabsRef: IonTabs) {
    this.activeTab = (tabsRef.outlet as any).activatedView.element;
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }
  
  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }
  
  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }
  
  ionViewDidEnter() {
    this.chatNotRead = false;
    this.propagateToActiveTab('ionViewDidEnter');
  }
  
  private propagateToActiveTab(eventName: string) {    
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }

  checkRead() {
    this.gotNotifs = false;
    console.log("i ran");
  }

  ionSelected() {
    this.checkRead();
  }
}
