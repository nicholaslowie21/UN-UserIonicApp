import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMarketplaceResourcesPageRoutingModule } from './view-marketplace-resources-routing.module';

import { ViewMarketplaceResourcesPage } from './view-marketplace-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMarketplaceResourcesPageRoutingModule
  ],
  declarations: [ViewMarketplaceResourcesPage]
})
export class ViewMarketplaceResourcesPageModule {}
