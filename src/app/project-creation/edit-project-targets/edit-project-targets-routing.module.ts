import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProjectTargetsPage } from './edit-project-targets.page';

const routes: Routes = [
  {
    path: '',
    component: EditProjectTargetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProjectTargetsPageRoutingModule {}
