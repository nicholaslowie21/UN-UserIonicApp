import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOthersProjectsPage } from './view-others-projects.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOthersProjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOthersProjectsPageRoutingModule {}
