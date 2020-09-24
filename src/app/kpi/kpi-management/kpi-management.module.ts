import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KpiManagementPageRoutingModule } from './kpi-management-routing.module';

import { KpiManagementPage } from './kpi-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KpiManagementPageRoutingModule
  ],
  declarations: [KpiManagementPage]
})
export class KpiManagementPageModule {}
