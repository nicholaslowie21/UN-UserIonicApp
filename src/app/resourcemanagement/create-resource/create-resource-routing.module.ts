import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateResourcePage } from './create-resource.page';

const routes: Routes = [
  {
    path: '',
    component: CreateResourcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateResourcePageRoutingModule {}
