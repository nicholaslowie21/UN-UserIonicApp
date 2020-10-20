import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProjectRequestsPage } from './my-project-requests.page';

const routes: Routes = [
  {
    path: '',
    component: MyProjectRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProjectRequestsPageRoutingModule {}
