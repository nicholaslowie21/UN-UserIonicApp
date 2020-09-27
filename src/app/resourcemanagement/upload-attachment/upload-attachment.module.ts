import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadAttachmentPageRoutingModule } from './upload-attachment-routing.module';

import { UploadAttachmentPage } from './upload-attachment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadAttachmentPageRoutingModule
  ],
  declarations: [UploadAttachmentPage]
})
export class UploadAttachmentPageModule {}
