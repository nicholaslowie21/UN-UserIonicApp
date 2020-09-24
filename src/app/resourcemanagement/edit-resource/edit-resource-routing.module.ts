import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditResourcePage } from './edit-resource.page';

const routes: Routes = [
  {
    path: '',
    component: EditResourcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditResourcePageRoutingModule {}
