import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-announcement-details',
  templateUrl: './view-announcement-details.page.html',
  styleUrls: ['./view-announcement-details.page.scss'],
})
export class ViewAnnouncementDetailsPage implements OnInit {
  @Input("title") title;
  @Input("desc") desc;
  @Input("createdAt") createdAt
  constructor() {
   }

  ngOnInit() {
  }

}
