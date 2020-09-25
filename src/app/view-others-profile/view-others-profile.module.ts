import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOthersProfilePageRoutingModule } from './view-others-profile-routing.module';

import { ViewOthersProfilePage } from './view-others-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOthersProfilePageRoutingModule
  ],
  declarations: [ViewOthersProfilePage]
})
export class ViewOthersProfilePageModule {}
