import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProfileTargetsPageRoutingModule } from './view-profile-targets-routing.module';

import { ViewProfileTargetsPage } from './view-profile-targets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProfileTargetsPageRoutingModule
  ],
  declarations: [ViewProfileTargetsPage]
})
export class ViewProfileTargetsPageModule {}
