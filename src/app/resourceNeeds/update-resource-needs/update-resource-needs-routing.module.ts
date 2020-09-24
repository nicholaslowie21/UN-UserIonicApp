import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateResourceNeedsPage } from './update-resource-needs.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateResourceNeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateResourceNeedsPageRoutingModule {}
