import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPaidResourceDetailsPage } from './view-paid-resource-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPaidResourceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPaidResourceDetailsPageRoutingModule {}
