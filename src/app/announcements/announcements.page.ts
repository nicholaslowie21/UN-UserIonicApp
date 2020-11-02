import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  announcements: any;

  constructor(private commService:CommunicationService) { }

  ngOnInit() {
    this.initialise();
  }

  initialise() {
    this.commService.viewAnnouncements().subscribe((res) => {
        this.announcements = res.data.announcements;
    }, (err) => {
      console.log("View Announcement Error: " + err.error.msg);
    })

    console.log(this.announcements);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

}
