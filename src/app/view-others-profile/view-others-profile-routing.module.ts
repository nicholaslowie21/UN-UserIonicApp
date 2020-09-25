import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOthersProfilePage } from './view-others-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOthersProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOthersProfilePageRoutingModule {}
