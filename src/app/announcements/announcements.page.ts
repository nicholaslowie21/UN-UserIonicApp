import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CommunicationService } from '../services/communication.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ViewAnnouncementDetailsPage } from '../view-announcement-details/view-announcement-details.page';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  announcements: any;
  type: string;
  notifications: any;
  noAnnouncementBoolean: boolean;
  noNotificationBoolean: boolean;

  constructor(private commService:CommunicationService, 
    private tokenStorage: TokenStorageService,
    private popoverController: PopoverController) {
      this.type = "notifs";
     }

  ngOnInit() {
    this.initialise();
  }

  initialise() {
    this.commService.viewAnnouncements().subscribe((res) => {
        this.announcements = res.data.announcements;
        if(this.announcements.length == 0) {
          this.noAnnouncementBoolean = true;
        } else {
          this.noAnnouncementBoolean = false;
        }
    }, (err) => {
      console.log("View Announcement Error: " + err.error.msg);
    })
      this.tokenStorage.saveAnnouncementLength(0);
      
    this.commService.viewNotifications().subscribe((res) => {
      this.notifications = res.data.notifications;
      if(this.notifications.length == 0) {
        this.noNotificationBoolean = true;
      } else {
        this.noNotificationBoolean = false;
      }
    }, (err) => {
      console.log("View Notifications Error: " + err.error.msg);
    })
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  async presentPopover(a) {
    const popover = await this.popoverController.create({
      component: ViewAnnouncementDetailsPage,
      cssClass: 'my-custom-class',
      // event: ev,
      componentProps: {"title": a.title, "desc": a.desc, "createdAt": this.formatDate(a.createdAt)},
      translucent: true
    });
    return await popover.present();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
