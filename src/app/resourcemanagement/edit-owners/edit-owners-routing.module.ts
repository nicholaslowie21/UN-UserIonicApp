import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOwnersPage } from './edit-owners.page';

const routes: Routes = [
  {
    path: '',
    component: EditOwnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOwnersPageRoutingModule {}
