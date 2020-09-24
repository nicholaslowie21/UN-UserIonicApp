import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateResourceNeedPageRoutingModule } from './create-resource-need-routing.module';

import { CreateResourceNeedPage } from './create-resource-need.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateResourceNeedPageRoutingModule
  ],
  declarations: [CreateResourceNeedPage]
})
export class CreateResourceNeedPageModule {}
