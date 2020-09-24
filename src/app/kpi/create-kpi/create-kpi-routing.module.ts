import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateKpiPage } from './create-kpi.page';

const routes: Routes = [
  {
    path: '',
    component: CreateKpiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateKpiPageRoutingModule {}
