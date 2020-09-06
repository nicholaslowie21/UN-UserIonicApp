import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestVerificationPage } from './request-verification.page';

const routes: Routes = [
  {
    path: '',
    component: RequestVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestVerificationPageRoutingModule {}
