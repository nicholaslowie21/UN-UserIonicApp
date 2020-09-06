import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterSplitPage } from './register-split.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterSplitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterSplitPageRoutingModule {}
