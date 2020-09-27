import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadResourcePicPageRoutingModule } from './upload-resource-pic-routing.module';

import { UploadResourcePicPage } from './upload-resource-pic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadResourcePicPageRoutingModule
  ],
  declarations: [UploadResourcePicPage]
})
export class UploadResourcePicPageModule {}
