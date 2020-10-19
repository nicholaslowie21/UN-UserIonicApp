import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMarketProjectDetailsPageRoutingModule } from './view-market-project-details-routing.module';

import { ViewMarketProjectDetailsPage } from './view-market-project-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMarketProjectDetailsPageRoutingModule
  ],
  declarations: [ViewMarketProjectDetailsPage]
})
export class ViewMarketProjectDetailsPageModule {}
