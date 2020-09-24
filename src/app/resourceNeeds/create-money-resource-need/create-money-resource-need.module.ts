import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMoneyResourceNeedPageRoutingModule } from './create-money-resource-need-routing.module';

import { CreateMoneyResourceNeedPage } from './create-money-resource-need.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMoneyResourceNeedPageRoutingModule
  ],
  declarations: [CreateMoneyResourceNeedPage]
})
export class CreateMoneyResourceNeedPageModule {}
