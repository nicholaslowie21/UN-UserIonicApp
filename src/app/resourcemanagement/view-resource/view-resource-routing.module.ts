import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewResourcePage } from './view-resource.page';

const routes: Routes = [
  {
    path: '',
    component: ViewResourcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewResourcePageRoutingModule {}
