import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRatingPage } from './edit-rating.page';

const routes: Routes = [
  {
    path: '',
    component: EditRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRatingPageRoutingModule {}
