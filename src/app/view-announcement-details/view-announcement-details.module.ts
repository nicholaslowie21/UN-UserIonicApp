import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAnnouncementDetailsPageRoutingModule } from './view-announcement-details-routing.module';

import { ViewAnnouncementDetailsPage } from './view-announcement-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAnnouncementDetailsPageRoutingModule
  ],
  declarations: [ViewAnnouncementDetailsPage]
})
export class ViewAnnouncementDetailsPageModule {}
