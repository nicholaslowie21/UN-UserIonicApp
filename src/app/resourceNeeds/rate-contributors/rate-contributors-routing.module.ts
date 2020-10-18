import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateContributorsPage } from './rate-contributors.page';

const routes: Routes = [
  {
    path: '',
    component: RateContributorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateContributorsPageRoutingModule {}
