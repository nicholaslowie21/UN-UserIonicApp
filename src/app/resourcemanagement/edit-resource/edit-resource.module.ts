import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditResourcePageRoutingModule } from './edit-resource-routing.module';

import { EditResourcePage } from './edit-resource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditResourcePageRoutingModule
  ],
  declarations: [EditResourcePage]
})
export class EditResourcePageModule {}
