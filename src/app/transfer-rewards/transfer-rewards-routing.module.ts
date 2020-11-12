import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferRewardsPage } from './transfer-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: TransferRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferRewardsPageRoutingModule {}
