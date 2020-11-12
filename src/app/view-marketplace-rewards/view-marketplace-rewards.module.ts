import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMarketplaceRewardsPageRoutingModule } from './view-marketplace-rewards-routing.module';

import { ViewMarketplaceRewardsPage } from './view-marketplace-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMarketplaceRewardsPageRoutingModule
  ],
  declarations: [ViewMarketplaceRewardsPage]
})
export class ViewMarketplaceRewardsPageModule {}
