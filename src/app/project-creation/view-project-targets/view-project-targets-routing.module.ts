import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProjectTargetsPage } from './view-project-targets.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProjectTargetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProjectTargetsPageRoutingModule {}
