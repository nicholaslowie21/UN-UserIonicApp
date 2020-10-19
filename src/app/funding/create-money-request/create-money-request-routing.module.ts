import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMoneyRequestPage } from './create-money-request.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMoneyRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMoneyRequestPageRoutingModule {}
