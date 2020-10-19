import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMarketProjectDetailsPage } from './view-market-project-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMarketProjectDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMarketProjectDetailsPageRoutingModule {}
