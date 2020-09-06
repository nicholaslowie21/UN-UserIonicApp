import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitutionRegisterPage } from './institution-register.page';

const routes: Routes = [
  {
    path: '',
    component: InstitutionRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRegisterPageRoutingModule {}
