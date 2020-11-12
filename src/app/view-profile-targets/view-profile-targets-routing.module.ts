import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProfileTargetsPage } from './view-profile-targets.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProfileTargetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProfileTargetsPageRoutingModule {}
