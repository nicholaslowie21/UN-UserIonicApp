import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMarketplaceProjectsPageRoutingModule } from './view-marketplace-projects-routing.module';

import { ViewMarketplaceProjectsPage } from './view-marketplace-projects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMarketplaceProjectsPageRoutingModule
  ],
  declarations: [ViewMarketplaceProjectsPage]
})
export class ViewMarketplaceProjectsPageModule {}
