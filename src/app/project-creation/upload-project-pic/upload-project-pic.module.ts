import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadProjectPicPageRoutingModule } from './upload-project-pic-routing.module';

import { UploadProjectPicPage } from './upload-project-pic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadProjectPicPageRoutingModule
  ],
  declarations: [UploadProjectPicPage]
})
export class UploadProjectPicPageModule {}
