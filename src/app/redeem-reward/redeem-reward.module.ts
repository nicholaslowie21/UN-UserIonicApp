import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedeemRewardPageRoutingModule } from './redeem-reward-routing.module';

import { RedeemRewardPage } from './redeem-reward.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedeemRewardPageRoutingModule
  ],
  declarations: [RedeemRewardPage]
})
export class RedeemRewardPageModule {}
