import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadAttachmentPage } from './upload-attachment.page';

const routes: Routes = [
  {
    path: '',
    component: UploadAttachmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadAttachmentPageRoutingModule {}
