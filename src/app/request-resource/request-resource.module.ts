import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestResourcePageRoutingModule } from './request-resource-routing.module';

import { RequestResourcePage } from './request-resource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestResourcePageRoutingModule
  ],
  declarations: [RequestResourcePage]
})
export class RequestResourcePageModule {}
