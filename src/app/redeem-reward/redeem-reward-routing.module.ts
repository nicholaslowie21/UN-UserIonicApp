import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedeemRewardPage } from './redeem-reward.page';

const routes: Routes = [
  {
    path: '',
    component: RedeemRewardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedeemRewardPageRoutingModule {}
