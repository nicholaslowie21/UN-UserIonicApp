import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceNeedsManagementPage } from './resource-needs-management.page';

const routes: Routes = [
  {
    path: '',
    component: ResourceNeedsManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceNeedsManagementPageRoutingModule {}
