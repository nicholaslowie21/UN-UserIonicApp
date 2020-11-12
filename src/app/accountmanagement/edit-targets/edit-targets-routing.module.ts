import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTargetsPage } from './edit-targets.page';

const routes: Routes = [
  {
    path: '',
    component: EditTargetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTargetsPageRoutingModule {}
