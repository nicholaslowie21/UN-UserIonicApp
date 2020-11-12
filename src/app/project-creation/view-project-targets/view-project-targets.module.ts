import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProjectTargetsPageRoutingModule } from './view-project-targets-routing.module';

import { ViewProjectTargetsPage } from './view-project-targets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProjectTargetsPageRoutingModule
  ],
  declarations: [ViewProjectTargetsPage]
})
export class ViewProjectTargetsPageModule {}
