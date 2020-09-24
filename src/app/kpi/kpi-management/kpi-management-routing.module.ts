import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpiManagementPage } from './kpi-management.page';

const routes: Routes = [
  {
    path: '',
    component: KpiManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpiManagementPageRoutingModule {}
