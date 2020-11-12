import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardConfirmationPage } from './reward-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: RewardConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardConfirmationPageRoutingModule {}
