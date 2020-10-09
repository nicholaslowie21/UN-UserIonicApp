import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFundingNeedsPageRoutingModule } from './view-funding-needs-routing.module';

import { ViewFundingNeedsPage } from './view-funding-needs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFundingNeedsPageRoutingModule
  ],
  declarations: [ViewFundingNeedsPage]
})
export class ViewFundingNeedsPageModule {}
