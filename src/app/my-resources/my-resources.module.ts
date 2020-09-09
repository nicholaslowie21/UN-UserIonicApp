import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyResourcesPageRoutingModule } from './my-resources-routing.module';

import { MyResourcesPage } from './my-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyResourcesPageRoutingModule
  ],
  declarations: [MyResourcesPage]
})
export class MyResourcesPageModule {}
