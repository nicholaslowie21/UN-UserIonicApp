import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetpasswordPage } from './forget-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetpasswordPageRoutingModule {}
