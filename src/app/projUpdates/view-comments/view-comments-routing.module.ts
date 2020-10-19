import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCommentsPage } from './view-comments.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCommentsPageRoutingModule {}
