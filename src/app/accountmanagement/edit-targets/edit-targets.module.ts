import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTargetsPageRoutingModule } from './edit-targets-routing.module';

import { EditTargetsPage } from './edit-targets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTargetsPageRoutingModule
  ],
  declarations: [EditTargetsPage]
})
export class EditTargetsPageModule {}
