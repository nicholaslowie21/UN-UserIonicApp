import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProjectPage } from './update-project.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProjectPageRoutingModule {}
