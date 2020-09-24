import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadProjectPicPage } from './upload-project-pic.page';

const routes: Routes = [
  {
    path: '',
    component: UploadProjectPicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadProjectPicPageRoutingModule {}
