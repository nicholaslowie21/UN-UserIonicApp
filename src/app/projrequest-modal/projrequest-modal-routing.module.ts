import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjrequestModalPage } from './projrequest-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProjrequestModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjrequestModalPageRoutingModule {}
