import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOthersResourcesPageRoutingModule } from './view-others-resources-routing.module';

import { ViewOthersResourcesPage } from './view-others-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOthersResourcesPageRoutingModule
  ],
  declarations: [ViewOthersResourcesPage]
})
export class ViewOthersResourcesPageModule {}
