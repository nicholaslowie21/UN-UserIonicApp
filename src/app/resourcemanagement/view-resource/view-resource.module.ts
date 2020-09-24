import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewResourcePageRoutingModule } from './view-resource-routing.module';

import { ViewResourcePage } from './view-resource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewResourcePageRoutingModule
  ],
  declarations: [ViewResourcePage]
})
export class ViewResourcePageModule {}
