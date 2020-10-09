import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFundingNeedsPage } from './view-funding-needs.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFundingNeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFundingNeedsPageRoutingModule {}
