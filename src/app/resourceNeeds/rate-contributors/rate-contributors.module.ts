import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateContributorsPageRoutingModule } from './rate-contributors-routing.module';

import { RateContributorsPage } from './rate-contributors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateContributorsPageRoutingModule
  ],
  declarations: [RateContributorsPage]
})
export class RateContributorsPageModule {}
