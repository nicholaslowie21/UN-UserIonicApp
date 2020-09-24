import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateKpiPage } from './update-kpi.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateKpiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateKpiPageRoutingModule {}
