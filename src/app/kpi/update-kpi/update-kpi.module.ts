import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateKpiPageRoutingModule } from './update-kpi-routing.module';

import { UpdateKpiPage } from './update-kpi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateKpiPageRoutingModule
  ],
  declarations: [UpdateKpiPage]
})
export class UpdateKpiPageModule {}
