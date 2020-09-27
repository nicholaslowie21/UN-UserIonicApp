import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOthersResourcesPage } from './view-others-resources.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOthersResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOthersResourcesPageRoutingModule {}
