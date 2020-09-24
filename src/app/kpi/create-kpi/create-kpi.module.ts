import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateKpiPageRoutingModule } from './create-kpi-routing.module';

import { CreateKpiPage } from './create-kpi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateKpiPageRoutingModule
  ],
  declarations: [CreateKpiPage]
})
export class CreateKpiPageModule {}
