import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCommentsPageRoutingModule } from './view-comments-routing.module';

import { ViewCommentsPage } from './view-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCommentsPageRoutingModule
  ],
  declarations: [ViewCommentsPage]
})
export class ViewCommentsPageModule {}
