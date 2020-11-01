import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMarketplaceRewardDetailsPageRoutingModule } from './view-marketplace-reward-details-routing.module';

import { ViewMarketplaceRewardDetailsPage } from './view-marketplace-reward-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMarketplaceRewardDetailsPageRoutingModule
  ],
  declarations: [ViewMarketplaceRewardDetailsPage]
})
export class ViewMarketplaceRewardDetailsPageModule {}
