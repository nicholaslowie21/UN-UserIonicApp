import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPaidResourceDetailsPageRoutingModule } from './view-paid-resource-details-routing.module';

import { ViewPaidResourceDetailsPage } from './view-paid-resource-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPaidResourceDetailsPageRoutingModule
  ],
  declarations: [ViewPaidResourceDetailsPage]
})
export class ViewPaidResourceDetailsPageModule {}
