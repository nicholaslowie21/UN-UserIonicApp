import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AffiliationManagementPageRoutingModule } from './affiliation-management-routing.module';

import { AffiliationManagementPage } from './affiliation-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AffiliationManagementPageRoutingModule
  ],
  declarations: [AffiliationManagementPage]
})
export class AffiliationManagementPageModule {}
