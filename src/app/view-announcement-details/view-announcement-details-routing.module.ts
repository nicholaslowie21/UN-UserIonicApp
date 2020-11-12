import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAnnouncementDetailsPage } from './view-announcement-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAnnouncementDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAnnouncementDetailsPageRoutingModule {}
