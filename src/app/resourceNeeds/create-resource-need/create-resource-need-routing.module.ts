import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateResourceNeedPage } from './create-resource-need.page';

const routes: Routes = [
  {
    path: '',
    component: CreateResourceNeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateResourceNeedPageRoutingModule {}
