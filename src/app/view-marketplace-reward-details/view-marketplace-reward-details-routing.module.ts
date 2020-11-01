import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMarketplaceRewardDetailsPage } from './view-marketplace-reward-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMarketplaceRewardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMarketplaceRewardDetailsPageRoutingModule {}
