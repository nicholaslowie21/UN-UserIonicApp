import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasePaidresourcePageRoutingModule } from './purchase-paidresource-routing.module';

import { PurchasePaidresourcePage } from './purchase-paidresource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasePaidresourcePageRoutingModule
  ],
  declarations: [PurchasePaidresourcePage]
})
export class PurchasePaidresourcePageModule {}
