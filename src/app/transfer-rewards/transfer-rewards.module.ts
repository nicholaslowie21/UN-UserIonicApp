import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferRewardsPageRoutingModule } from './transfer-rewards-routing.module';

import { TransferRewardsPage } from './transfer-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferRewardsPageRoutingModule
  ],
  declarations: [TransferRewardsPage]
})
export class TransferRewardsPageModule {}
