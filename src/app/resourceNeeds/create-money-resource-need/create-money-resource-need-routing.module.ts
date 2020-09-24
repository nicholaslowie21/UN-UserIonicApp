import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMoneyResourceNeedPage } from './create-money-resource-need.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMoneyResourceNeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMoneyResourceNeedPageRoutingModule {}
