import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardConfirmationPageRoutingModule } from './reward-confirmation-routing.module';

import { RewardConfirmationPage } from './reward-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardConfirmationPageRoutingModule
  ],
  declarations: [RewardConfirmationPage]
})
export class RewardConfirmationPageModule {}
