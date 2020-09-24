import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateResourceNeedsPageRoutingModule } from './update-resource-needs-routing.module';

import { UpdateResourceNeedsPage } from './update-resource-needs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateResourceNeedsPageRoutingModule
  ],
  declarations: [UpdateResourceNeedsPage]
})
export class UpdateResourceNeedsPageModule {}
