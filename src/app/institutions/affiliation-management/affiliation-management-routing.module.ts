import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AffiliationManagementPage } from './affiliation-management.page';

const routes: Routes = [
  {
    path: '',
    component: AffiliationManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffiliationManagementPageRoutingModule {}
