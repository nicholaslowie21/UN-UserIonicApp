import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMarketplaceProjectsPage } from './view-marketplace-projects.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMarketplaceProjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMarketplaceProjectsPageRoutingModule {}
