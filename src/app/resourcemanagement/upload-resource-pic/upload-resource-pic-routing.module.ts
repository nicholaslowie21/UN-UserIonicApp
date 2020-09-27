import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadResourcePicPage } from './upload-resource-pic.page';

const routes: Routes = [
  {
    path: '',
    component: UploadResourcePicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadResourcePicPageRoutingModule {}
