import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMarketplaceRewardsPage } from './view-marketplace-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMarketplaceRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMarketplaceRewardsPageRoutingModule {}
