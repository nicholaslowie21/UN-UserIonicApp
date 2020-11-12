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

  constructor(private commService:CommunicationService, 
    private tokenStorage: TokenStorageService,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.initialise();
  }

  initialise() {
    this.commService.viewAnnouncements().subscribe((res) => {
        this.announcements = res.data.announcements;
    }, (err) => {
      console.log("View Announcement Error: " + err.error.msg);
    })
      this.tokenStorage.saveAnnouncementLength(0);
    console.log(this.announcements);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  async presentPopover(ev: any, a) {
    const popover = await this.popoverController.create({
      component: ViewAnnouncementDetailsPage,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps: {"title": a.title, "desc": a.desc, "createdAt": this.formatDate(a.createdAt)},
      translucent: true
    });
    return await popover.present();
  }

}
